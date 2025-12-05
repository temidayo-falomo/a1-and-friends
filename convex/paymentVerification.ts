import { internalAction } from "./_generated/server";
import { api } from "./_generated/api";
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

// Scheduled function to periodically verify pending payments
// This runs every 10 minutes to check for payments that completed
// but weren't verified due to client-side callback failures
export const verifyPendingPayments = internalAction({
  args: {},
  handler: async (ctx) => {
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecretKey) {
      console.error(
        "[Payment Verification] PAYSTACK_SECRET_KEY is not configured"
      );
      return;
    }

    // Get all pending reservations
    const pendingReservations = await ctx.runQuery(
      api.reservations.getPendingReservations
    );

    if (pendingReservations.length === 0) {
      console.log("[Payment Verification] No pending payments to verify");
      return;
    }

    console.log(
      `[Payment Verification] Checking ${pendingReservations.length} pending payment(s)`
    );

    let verifiedCount = 0;
    let failedCount = 0;
    let stillPendingCount = 0;

    // Verify each pending payment with Paystack
    for (const reservation of pendingReservations) {
      try {
        const paymentReference = reservation.paymentReference;

        // Verify payment with Paystack
        const response = await fetch(
          `https://api.paystack.co/transaction/verify/${paymentReference}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${paystackSecretKey}`,
            },
          }
        );

        if (!response.ok) {
          console.error(
            `[Payment Verification] Failed to verify ${paymentReference}: HTTP ${response.status}`
          );
          stillPendingCount++;
          continue;
        }

        const data = await response.json();

        if (!data.status) {
          console.error(
            `[Payment Verification] Paystack API error for ${paymentReference}: ${data.message}`
          );
          stillPendingCount++;
          continue;
        }

        const transactionStatus = data.data?.status;

        // Only update if payment status has changed
        if (transactionStatus === "success") {
          await ctx.runMutation(api.reservations.updatePaymentStatus, {
            paymentReference,
            paymentStatus: "success",
          });
          verifiedCount++;
          console.log(
            `[Payment Verification] ✅ Verified successful payment: ${paymentReference}`
          );
        } else if (transactionStatus === "failed") {
          await ctx.runMutation(api.reservations.updatePaymentStatus, {
            paymentReference,
            paymentStatus: "failed",
          });
          failedCount++;
          console.log(
            `[Payment Verification] ❌ Marked failed payment: ${paymentReference}`
          );
        } else {
          // Still pending or other status
          stillPendingCount++;
          console.log(
            `[Payment Verification] ⏳ Payment still pending: ${paymentReference} (status: ${transactionStatus})`
          );
        }
      } catch (error) {
        console.error(
          `[Payment Verification] Error verifying ${reservation.paymentReference}:`,
          error
        );
        stillPendingCount++;
      }
    }

    console.log(
      `[Payment Verification] Completed: ${verifiedCount} verified, ${failedCount} failed, ${stillPendingCount} still pending`
    );
  },
});

// Schedule the verification job to run every 10 minutes
const crons = cronJobs();
crons.interval(
  "verify pending payments",
  { minutes: 10 },
  internal.paymentVerification.verifyPendingPayments
);
export default crons;
