"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import NavBar from "@/components/navbar/navbar";
// import ExhibitObjViewer from "@/components/exhibit-obj-viewer";

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

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-24 lg:px-10">
        <NavBar />
        <section
          id="hero-layout"
          className="flex flex-col items-start gap-12 pt-8 px-4 md:px-0"
        >
          <div className="space-y-6 flex flex-col items-start">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-300">
              Exhibit Presents
            </p>
            <h1 className="text-6xl relative font-black leading-tight text-white lg:text-8xl text-left">
              A1 & Friends

              <Image
                src="/A1 Assets/Accessories/Hats/Hat 3.png"
                alt="A1"
                width={50}
                height={50}
                className="absolute top-0 right-0"
              />
            </h1>
            <p className="max-w-xl text-lg text-neutral-200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet facilisis urna, quis pretium sapien. Etiam euismod, velit at
              faucibus posuere, enim eros cursus nisl.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center w-full">
              <button className="rounded-full w-full md:w-auto border cursor-pointer border-white/30 bg-white/10 px-6 py-3 text-sm uppercase tracking-wide transition hover:border-white hover:bg-white hover:text-black">
                RSVP guestlist
              </button>
              <button className="rounded-full w-full md:w-auto cursor-pointer border border-white/30 px-6 py-3 text-sm uppercase tracking-wide text-white transition hover:border-[#ffc659] hover:text-[#ffc659]">
                Reserve a table
              </button>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                Jan 1 · VI Lagos
              </p>
            </div>
          </div>
          <div className="relative flex items-center flex-wrap justify-center gap-12 w-full">
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
          </div>
        </section>
        {/* 
        <section
          id="club-layout"
          className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/5 p-6"
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-300">
              Spatial preview
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Walk through the 3D Club Exhibit
            </h2>
            <p className="text-sm text-neutral-300">
              Explore the OBJ straight from design — rotate, zoom, and feel the
              floor plan before doors open.
            </p>
          </div>
          <ExhibitObjViewer />
        </section> */}

        <section id="about-layout" className="flex flex-col items-start gap-12">
          <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl text-left">
            About
          </h2>
          <p className="text-lg text-neutral-200 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet facilisis urna, quis pretium sapien. Etiam euismod, velit at
            faucibus posuere, enim eros cursus nisl.
          </p>
        </section>

        <section
          id="rsvp-form"
          className="grid gap-10 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur lg:grid-cols-2"
        >
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-300">
              RSVP module
            </p>
            <h2 className="md:text-5xl mb-4 text-4xl font-semibold text-white">
              Drop your guest intel
            </h2>
            <p className="text-neutral-300">
              We only honor codes sent via SMS blast. Use the exact four
              characters included with your invitation.
            </p>
            <div className="relative flex items-center justify-center gap-6 w-full mt-8">
              {girlies
              .slice(0, 3)
              .map((fileName, idx) => (
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
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6"
          >
            <label className="block text-sm uppercase tracking-[0.2em] text-neutral-300">
              Full Name
              <input
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                className="mt-2 w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base text-white placeholder:text-neutral-500 focus:border-white"
                placeholder="Amara Oni"
                required
              />
            </label>
            <label className="block text-sm uppercase tracking-[0.2em] text-neutral-300">
              Email
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className="mt-2 w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base text-white placeholder:text-neutral-500 focus:border-white"
                placeholder="amara@clubstudio.africa"
                required
              />
            </label>
            <label className="block text-sm uppercase tracking-[0.2em] text-neutral-300">
              4-char code
              <input
                type="text"
                value={form.code}
                onChange={handleChange("code")}
                maxLength={4}
                className="mt-2 w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-center text-2xl tracking-[0.6em] text-white placeholder:text-neutral-500 focus:border-white"
                placeholder="A1X3"
                required
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-white py-3 text-sm font-semibold uppercase tracking-[0.4em] text-black transition hover:bg-[#ffdf97]"
            >
              Submit RSVP
            </button>
            <p
              className={`text-xs uppercase tracking-[0.35em] ${
                status === "error"
                  ? "text-[#ff6b6b]"
                  : status === "success"
                  ? "text-[#7cffb1]"
                  : "text-neutral-400"
              }`}
            >
              {hint}
            </p>
          </form>
        </section>

        <section
          id="table-copy"
          className="space-y-8 rounded-[32px] border border-white/10 bg-linear-to-br from-white/5 via-black/20 to-black/60 p-8"
        >
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-300">
              Table info & pricing
            </p>
            <h2 className="md:text-5xl mb-4 text-4xl font-semibold text-white">
              Fee locks your table. <br /> Min spend scales after Dec 1st.
            </h2>
            <p className="text-neutral-300 max-w-xl">
              Wire receipts secure placements. Once payment clears, concierge
              shares bottle run-of-show, lighting cues, and photo direction
              inspired by the poster grid.
            </p>
          </header>
          <div className="grid gap-6 lg:grid-cols-2">
            {tableCopy.map((tier) => (
              <article
                key={tier.label}
                className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-black/30 p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white">
                    {tier.label}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.35em] text-[#ffc659]">
                    {tier.window}
                  </span>
                </div>
                <ul className="space-y-3 text-sm text-neutral-200">
                  {tier.highlights.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ffc659]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                  Reservation fee is non-refundable but rolls into final tally.
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
