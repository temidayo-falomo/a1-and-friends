import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Action to initialize Paystack payment
// This will be called from the client to get payment authorization URL
export const initializePayment: ReturnType<typeof action> = action({
  args: {
    eventId: v.string(),
    tableNumber: v.number(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    reservationFee: v.number(),
    minimumSpendPerSeat: v.number(),
  },
  handler: async (ctx, args) => {
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecretKey) {
      throw new Error("PAYSTACK_SECRET_KEY is not configured");
    }

    // Generate a unique reference for this payment
    const paymentReference = `TBL_${args.eventId}_${args.tableNumber}_${Date.now()}`;

    // Create reservation with pending status
    const reservationId = await ctx.runMutation(
      api.reservations.createReservation,
      {
        eventId: args.eventId,
        tableNumber: args.tableNumber,
        customerName: args.customerName,
        customerEmail: args.customerEmail,
        customerPhone: args.customerPhone,
        reservationFee: args.reservationFee,
        minimumSpendPerSeat: args.minimumSpendPerSeat,
        paymentReference,
      }
    );

    // Initialize Paystack payment
    const amountInKobo = Math.round(args.reservationFee * 100); // Convert NGN to kobo

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: args.customerEmail,
          amount: amountInKobo,
          reference: paymentReference,
          metadata: {
            eventId: args.eventId,
            tableNumber: args.tableNumber,
            reservationId: reservationId,
            customerName: args.customerName,
            customerPhone: args.customerPhone,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Paystack initialization failed: ${error}`);
    }

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || "Failed to initialize payment");
    }

    return {
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
      reference: paymentReference,
    };
  },
});

// Action to verify payment after user completes payment
export const verifyPayment = action({
  args: {
    paymentReference: v.string(),
  },
  handler: async (ctx, args) => {
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecretKey) {
      throw new Error("PAYSTACK_SECRET_KEY is not configured");
    }

    // Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${args.paymentReference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Payment verification failed: ${error}`);
    }

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || "Payment verification failed");
    }

    // Update reservation status based on payment result
    const paymentStatus = data.data.status === "success" ? "success" : "failed";

    await ctx.runMutation(api.reservations.updatePaymentStatus, {
      paymentReference: args.paymentReference,
      paymentStatus,
    });

    return {
      success: paymentStatus === "success",
      status: paymentStatus,
      message: data.data.gateway_response || data.message,
    };
  },
});
