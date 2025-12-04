"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const codePattern = /^[A-Z0-9]{4}$/;

const SHEET_BEST_API =
  "https://api.sheetbest.com/sheets/0a1bb073-c1eb-4937-a047-6e9ad4277aa8";

// Mapping of event names to their unique RSVP codes
const EVENT_CODES: Record<string, string> = {
  Waved: "A1WV",
  "Cruise Gang & 44DB": "44CG",
};

interface RSVPModalProps {
  children: React.ReactNode;
  eventName?: string;
}

export default function RSVPModal({ children, eventName }: RSVPModalProps) {
  const [form, setForm] = useState({ name: "", email: "", code: "" });
  const [status, setStatus] = useState<
    "idle" | "error" | "success" | "loading"
  >("idle");
  const [hint, setHint] = useState(
    "Need your 4-char access code from the invite text."
  );
  const [open, setOpen] = useState(false);

  const handleChange =
    (field: "name" | "email" | "code") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]:
          field === "code"
            ? event.target.value.toUpperCase()
            : event.target.value,
      }));
      if (status !== "idle") {
        setStatus("idle");
        setHint("Need your 4-char access code from the invite text.");
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedCode = form.code.trim().toUpperCase();

    // Basic validation
    if (!trimmedName || !trimmedEmail || !codePattern.test(trimmedCode)) {
      setStatus("error");
      setHint("Code must be exactly 4 letters/numbers • Fill every field.");
      return;
    }

    // Validate code matches the event's required code
    if (eventName) {
      const expectedCode = EVENT_CODES[eventName];
      if (expectedCode && trimmedCode !== expectedCode) {
        setStatus("error");
        setHint(
          `Invalid code. Please use the correct RSVP code for this event.`
        );
        return;
      }
    }

    setStatus("loading");
    setHint("Submitting your RSVP...");

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
            Code: trimmedCode,
            Event: eventName || "Unknown",
            Timestamp: new Date().toISOString(),
          },
        ]),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStatus("success");
      setHint("Locked in. Expect follow-up within 12 hours.");

      // Close modal after success
      setTimeout(() => {
        setOpen(false);
        setForm({ name: "", email: "", code: "" });
        setStatus("idle");
        setHint("Need your 4-char access code from the invite text.");
      }, 2000);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setStatus("error");
      setHint("Something went wrong. Please try again or contact support.");
    }
  };

  const isLocked = eventName === "Waved";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogTitle className="sr-only">RSVP</DialogTitle>
      <DialogContent className="max-w-4xl bg-transparent border-none p-0 shadow-none font-['helvetica-extended']">
        <section className="rounded-[32px] border border-white/10 bg-white mx-4 md:mx-0 px-4 py-8 md:px-8 backdrop-blur lg:grid-cols-2">
          {/* <div className="space-y-3">
            <div className="relative flex items-center justify-center gap-6 w-full mt-8">
              {girlies.slice(0, 3).map((fileName, idx) => (
                <Image
                  key={idx}
                  src={`/A1 Assets/Girlies/${fileName}`}
                  alt={`Guest muse ${fileName}`}
                  width={130}
                  height={130}
                  className="w-14 md:w-[150px]"
                />
              ))}
            </div>
          </div> */}
          {isLocked ? (
            <div className="space-y-6 rounded-2xl w-full text-center py-8">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.3em] text-black leading-snug">
                RSVP <br />  LOCKED
              </h2>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl w-full"
            >
              <label className="block md:text-base text-sm font-bold uppercase tracking-[0.2em] text-black">
                FULL NAME
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  className="mt-2 w-full rounded-xl border border-black bg-transparent px-4 py-3 text-base font-bold text-black placeholder:text-neutral-500 focus:border-white"
                  placeholder="TYPE YOUR FULL NAME"
                  required
                />
              </label>
              <label className="block md:text-base text-sm font-bold uppercase tracking-[0.2em] text-black">
                Email Address
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  className="mt-2 w-full rounded-xl border border-black bg-transparent px-4 py-3 text-base font-bold text-black placeholder:text-neutral-500 focus:border-white"
                  placeholder="TYPE YOUR EMAIL"
                  required
                />
              </label>
              <label className="block md:text-base text-sm font-bold uppercase tracking-[0.2em] text-black">
                4 DIGIT PIN
                <input
                  type="text"
                  value={form.code}
                  onChange={handleChange("code")}
                  maxLength={4}
                  className="mt-2 w-full rounded-xl border border-black bg-transparent px-4 py-3 text-center md:text-xl text-base font-bold tracking-[0.3em] text-black placeholder:text-neutral-500 focus:border-white"
                  placeholder="TYPE YOUR 4 DIGIT PIN"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-black py-3 text-base font-semibold uppercase tracking-[0.4em] text-white cursor-pointer transition hover:bg-[#ffdf97] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Submitting..." : "Submit"}
              </button>
              {status !== "idle" && (
                <p
                  className={`text-center text-sm font-medium ${
                    status === "success"
                      ? "text-green-600"
                      : status === "error"
                      ? "text-red-600"
                      : "text-neutral-600"
                  }`}
                >
                  {hint}
                </p>
              )}
            </form>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}
