"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SHEET_BEST_API =
  "https://api.sheetbest.com/sheets/f209fd33-139a-4786-b65a-f06ee5299ad3";

interface ReserveTableModalProps {
  children: React.ReactNode;
}

export default function ReserveTableModal({
  children,
}: ReserveTableModalProps) {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [status, setStatus] = useState<
    "idle" | "error" | "success" | "loading"
  >("idle");
  const [hint, setHint] = useState("Fill in your details to reserve a table.");
  const [open, setOpen] = useState(false);

  const handleChange =
    (field: "name" | "email" | "whatsapp") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      if (status !== "idle") {
        setStatus("idle");
        setHint("Fill in your details to reserve a table.");
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedWhatsapp = form.whatsapp.trim();

    // Basic validation
    if (!trimmedName || !trimmedEmail || !trimmedWhatsapp) {
      setStatus("error");
      setHint("Please fill in all fields to complete your reservation.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setStatus("error");
      setHint("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setHint("Processing your table reservation...");

    try {
      const response = await fetch(SHEET_BEST_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            Name: trimmedName,
            Email: trimmedEmail,
            Whatsapp: trimmedWhatsapp,
            Timestamp: new Date().toISOString(),
          },
        ]),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStatus("success");
      setHint("Table reserved! We'll contact you shortly to confirm.");

      // Close modal after success
      setTimeout(() => {
        setOpen(false);
        setForm({ name: "", email: "", whatsapp: "" });
        setStatus("idle");
        setHint("Fill in your details to reserve a table.");
      }, 2000);
    } catch (error) {
      console.error("Error submitting table reservation:", error);
      setStatus("error");
      setHint("Something went wrong. Please try again or contact support.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogTitle className="sr-only">Reserve a Table</DialogTitle>
      <DialogContent className="max-w-4xl bg-transparent border-none p-0 shadow-none font-['helvetica-extended']">
        <section className="rounded-[32px] border-2 border-black bg-gradient-to-br from-[#ffdf97] via-[#ffd580] to-[#ffcc66] mx-4 md:mx-0 px-4 py-8 md:px-8 backdrop-blur">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl w-full"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] text-black mb-2">
                Reserve a Table
              </h2>
              <p className="text-sm md:text-base text-black/70">
                Secure your VIP experience
              </p>
            </div>

            <label className="block md:text-base text-sm font-bold uppercase tracking-[0.2em] text-black">
             Full Name
              <input
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                className="mt-2 w-full rounded-xl border-2 border-black bg-white/90 px-4 py-3 text-base font-bold text-black placeholder:text-neutral-500 focus:border-black focus:bg-white focus:outline-none"
                placeholder="Amara Oni"
                required
              />
            </label>
            <label className="block md:text-base text-sm font-bold uppercase tracking-[0.2em] text-black">
              Email Address
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className="mt-2 w-full rounded-xl border-2 border-black bg-white/90 px-4 py-3 text-base font-bold text-black placeholder:text-neutral-500 focus:border-black focus:bg-white focus:outline-none"
                placeholder="amaraoni@gmail.com"
                required
              />
            </label>
            <label className="block md:text-base text-sm font-bold uppercase tracking-[0.2em] text-black">
              WhatsApp Number
              <input
                type="tel"
                value={form.whatsapp}
                onChange={handleChange("whatsapp")}
                className="mt-2 w-full rounded-xl border-2 border-black bg-white/90 px-4 py-3 text-base font-bold text-black placeholder:text-neutral-500 focus:border-black focus:bg-white focus:outline-none"
                placeholder="+234 812 345 6789"
                required
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-black border-2 border-black py-3 text-base font-semibold uppercase tracking-[0.4em] text-white cursor-pointer transition hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Reserving..." : "Reserve Table"}
            </button>
            {status !== "idle" && (
              <p
                className={`text-center text-sm font-medium ${
                  status === "success"
                    ? "text-green-700"
                    : status === "error"
                    ? "text-red-700"
                    : "text-neutral-700"
                }`}
              >
                {hint}
              </p>
            )}
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
