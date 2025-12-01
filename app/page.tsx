"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import NavBar from "@/components/navbar/navbar";
import ObjViewer from "@/components/obj-viewer";
import EventCard from "@/components/event-card";
import { events } from "@/data/events";

const codePattern = /^[A-Z0-9]{4}$/;

const tableCopy = [
  {
    label: "Main Lounge",
    window: "Nov 20 → Dec 1",
    highlights: [
      "Reservation fee ₦1.5m locks your lounge.",
      "Min spend ₦3m if confirmed before Nov 30.",
      "Late confirms (Dec 1) jump to ₦3.8m min spend.",
    ],
  },
  // {
  //   label: "Skyline VIP",
  //   window: "Nov 20 → Dec 1",
  //   highlights: [
  //     "Reservation fee ₦2.5m applied to total.",
  //     "Min spend ₦5m before Nov 30, ₦6m afterwards.",
  //     "Includes backstage escort + signature bottle drop.",
  //   ],
  // },
];

const girlies = [
  // "Girl 1.png",
  "Girl 2.png",
  // "Girl 3.png",
  // "Girl 4.png",
  "Girl 5.png",
  "Girl 6.png",
];

const guestCharacters = [
  "44DB.png",
  "44DB2.png",
  "A1.png",
  "CG1.png",
  "DANCE.png",
  "Gidi cruise.png",
  // "sv.png",
  "SV2.png",
  "Westway.png",
];

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", code: "" });
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [hint, setHint] = useState(
    "Need your 4-char access code from the invite text."
  );

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
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(247,195,87,0.35),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(135,165,255,0.25),transparent_60%)]" />
      </div> */}

      <main className="relative z-10 mx-auto flex w-full flex-col gap-8 px-6 pb-24 pt-24 lg:px-10">
        <NavBar />

        <section
          id="hero-layout"
          className="flex flex-col items-center gap-12 pt-8 mx-auto md:w-full max-w-7xl"
        >
          <div className="space-y-6 flex flex-col items-center text-center">
            <h1
              className="md:text-7xl text-5xl font-['helvetica-extended'] relative leading-tight text-white lg:text-8xl text-center font-bold"
              // style={{ fontFamily: "var(--font-canela)" }}
            >
              A1 & Friends
            </h1>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center w-full px-4 justify-center items-center">
              <p className="text-sm md:text-base text-center uppercase tracking-[0.3em] text-neutral-200">
                Jan 1 · VI Lagos
              </p>
            </div>
          </div>
          {/* <div className="relative flex items-center flex-wrap justify-center gap-12 w-full">
            {guestCharacters.map((fileName, idx) => (
              <Image
                key={idx}
                src={`/A1 Assets/Guest characters/${fileName}`}
                alt={`Guest character ${fileName}`}
                width={150}
                height={150}
                className="w-10 md:w-[80px]"
              />
            ))}
          </div> */}
        </section>

        <section className="w-full mx-auto">
          <div className="w-full pl-[5%] md:pl-0 relative mt-[10px] md:flex overflow-hidden">
            <div className="w-fit md:items-center md:justify-center md:w-full md:mx-auto flex md:grid md:grid-cols-4 overflow-x-auto snap-x snap-mandatory overflow-y-hidden">
              {events.map((event, index) => {
                // Create a slight rotation for each card (alternating between -2.5 and 2.5 degrees)
                const rotation = (index % 2 === 0 ? 1 : -1) * 2.5;
                return (
                  <EventCard
                    key={event.eventId}
                    img={event.eventImage || ""}
                    title={event.eventName}
                    type={event.eventCategory || "General"}
                    href={`events/${event.eventId}`}
                    rotation={rotation}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
