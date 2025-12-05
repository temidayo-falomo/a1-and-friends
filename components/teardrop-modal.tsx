"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

type TeardropModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teardropNumber: number;
  onBlueOut: () => void;
  isSelected: boolean;
  eventId: string;
  minimumSpendPerSeat?: number;
  reservationFee?: number;
  vipPositions?: number[];
};

const TeardropModal = ({
  open,
  onOpenChange,
  teardropNumber,
  onBlueOut,
  isSelected,
  eventId,
  minimumSpendPerSeat = 0,
  reservationFee = 0,
  vipPositions = [],
}: TeardropModalProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "processing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const initializePaymentAction = useAction(api.payments.initializePayment);
  const verifyPaymentAction = useAction(api.payments.verifyPayment);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleChange =
    (field: "name" | "email" | "phone") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      if (status !== "idle") {
        setStatus("idle");
        setErrorMessage("");
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedPhone = form.phone.trim();

    // Validation
    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      setStatus("error");
      setErrorMessage("Please fill in all fields");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (reservationFee <= 0) {
      setStatus("error");
      setErrorMessage("Reservation fee is required");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Initialize payment
      const paymentData = await initializePaymentAction({
        eventId,
        tableNumber: teardropNumber,
        customerName: trimmedName,
        customerEmail: trimmedEmail,
        customerPhone: trimmedPhone,
        reservationFee,
        minimumSpendPerSeat,
      });

      setStatus("processing");

      // Load Paystack inline script if not already loaded
      if (!window.PaystackPop) {
        const script = document.createElement("script");
        script.src = "https://js.paystack.co/v1/inline.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Define callback function for Paystack
      // Paystack requires a synchronous function that accepts a response parameter
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const paymentCallback = function (_response: unknown) {
        // Handle async payment verification inside the callback
        (async () => {
          try {
            // Verify payment
            const verification = await verifyPaymentAction({
              paymentReference: paymentData.reference,
            });

            if (verification.success) {
              setStatus("success");
              // Call onBlueOut to update UI
              onBlueOut();
              // Reset form and status (modal is already closed)
              setTimeout(() => {
                setForm({ name: "", email: "", phone: "" });
                setStatus("idle");
                setErrorMessage("");
              }, 2000);
            } else {
              setStatus("error");
              setErrorMessage(
                verification.message || "Payment verification failed"
              );
              // Reopen the modal to show the error
              onOpenChange(true);
            }
          } catch (error) {
            setStatus("error");
            const errorMessage =
              error instanceof Error
                ? error.message
                : "Failed to verify payment. Please contact support.";
            setErrorMessage(errorMessage);
            // Reopen the modal to show the error
            onOpenChange(true);
          }
        })();
      };

      // Open Paystack payment popup
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
        email: trimmedEmail,
        amount: Math.round(reservationFee * 100), // Convert to kobo
        ref: paymentData.reference,
        onClose: () => {
          setStatus("idle");
          setErrorMessage("Payment was cancelled");
          // Reopen the modal when Paystack is closed
          onOpenChange(true);
        },
        callback: paymentCallback,
      });

      handler.openIframe();
      // Close the teardrop modal when Paystack opens
      onOpenChange(false);
    } catch (error) {
      setStatus("error");
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to initialize payment. Please try again.";
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border border-white/20 text-white">
        <DialogTitle className="text-xl font-semibold">
          Table {teardropNumber}
        </DialogTitle>
        <DialogDescription className="text-white/70">
          {isSelected
            ? "This Table is Reserved."
            : `${
                vipPositions.includes(teardropNumber)
                  ? "Seats 6-8"
                  : "Seats 8-10"
              }`}
        </DialogDescription>

        {(minimumSpendPerSeat > 0 || reservationFee > 0) && (
          <div className="mt-4 space-y-2 text-base">
            {minimumSpendPerSeat > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-white/70">Minimum Spend:</span>
                <span className="font-semibold text-white text-xl">
                  {formatCurrency(minimumSpendPerSeat)}
                </span>
              </div>
            )}
            {reservationFee > 0 && (
              <div className="flex justify-between items-center">
                <div className="flex flex-col text-white/70">
                  <span>Reservation Fee:</span>
                  <span>(Non-refundable)</span>
                </div>
                <span className="font-semibold text-white text-xl">
                  {formatCurrency(reservationFee)}
                </span>
              </div>
            )}
          </div>
        )}

        {isSelected ? (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              disabled
              className="px-4 py-2 rounded-md font-medium transition-colors bg-gray-600 cursor-not-allowed"
            >
              Reserved
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white/70"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                disabled={status === "loading" || status === "processing"}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/70"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                disabled={status === "loading" || status === "processing"}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-white/70"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange("phone")}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
                disabled={status === "loading" || status === "processing"}
              />
            </div>

            {errorMessage && (
              <div className="text-red-400 text-sm">{errorMessage}</div>
            )}

            {status === "success" && (
              <div className="text-green-400 text-sm">
                Payment successful! Your table is reserved.
              </div>
            )}

            <button
              type="submit"
              disabled={
                isSelected ||
                status === "loading" ||
                status === "processing" ||
                status === "success"
              }
              className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
                isSelected ||
                status === "loading" ||
                status === "processing" ||
                status === "success"
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {status === "loading"
                ? "Initializing..."
                : status === "processing"
                  ? "Processing Payment..."
                  : status === "success"
                    ? "Reserved"
                    : `Reserve Your Table - ${formatCurrency(reservationFee)}`}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TeardropModal;
