"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const codePattern = /^[A-Z0-9]{4}$/;

const girlies = ["Girl 2.png", "Girl 5.png", "Girl 6.png"];

export default function RSVPModal({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState({ name: "", email: "", code: "" });
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    if (!trimmedName || !trimmedEmail || !codePattern.test(form.code)) {
      setStatus("error");
      setHint("Code must be exactly 4 letters/numbers • Fill every field.");
      return;
    }

    setStatus("success");
    setHint("Locked in. Expect RSVP concierge follow-up within 12 hours.");

    // Optionally close modal after success
    setTimeout(() => {
      setOpen(false);
      setForm({ name: "", email: "", code: "" });
      setStatus("idle");
      setHint("Need your 4-char access code from the invite text.");
    }, 2000);
  };

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
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl w-full"
          >
            <label className="block text-base font-bold uppercase tracking-[0.2em] text-black">
              Full Name
              <input
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                className="mt-2 w-full rounded-xl border border-black bg-transparent px-4 py-3 text-base font-bold text-black placeholder:text-neutral-500 focus:border-white"
                placeholder="Amara Oni"
                required
              />
            </label>
            <label className="block text-base font-bold uppercase tracking-[0.2em] text-black">
              Email
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className="mt-2 w-full rounded-xl border border-black bg-transparent px-4 py-3 text-base font-bold text-black placeholder:text-neutral-500 focus:border-white"
                placeholder="amaraoni@gmail.com"
                required
              />
            </label>
            <label className="block text-base font-bold uppercase tracking-[0.2em] text-black">
              4-char code
              <input
                type="text"
                value={form.code}
                onChange={handleChange("code")}
                maxLength={4}
                className="mt-2 w-full rounded-xl border border-black bg-transparent px-4 py-3 text-center text-2xl font-bold tracking-[0.6em] text-black placeholder:text-neutral-500 focus:border-white"
                placeholder="A1X3"
                required
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-black py-3 text-base font-semibold uppercase tracking-[0.4em] text-white cursor-pointer transition hover:bg-[#ffdf97]"
            >
              Submit RSVP
            </button>
            <p
              className={`text-xs font-bold uppercase tracking-[0.35em] ${
                status === "error"
                  ? "text-[#ff6b6b]"
                  : status === "success"
                  ? "text-[#7cffb1]"
                  : "text-black"
              }`}
            >
              {hint}
            </p>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
