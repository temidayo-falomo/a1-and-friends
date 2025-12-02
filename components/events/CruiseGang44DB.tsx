import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import RSVPModal from "@/components/rsvp-modal";
import ReserveTableModal from "@/components/reserve-table-modal";
import { Event } from "@/data/events";
import Clouds from "@/components/Clouds";
import { FloatingAudioButton } from "../FloatingAudioButton";

interface CruiseGang44DBProps {
  event: Event;
}

export default function CruiseGang44DB({ event }: CruiseGang44DBProps) {
  // Select 5 characters to match the flyer
  const flyerCharacters = [
    "/A1 Assets/Girlies/Girl 2.png",
    "/A1 Assets/Guest characters/44DB.png",
    "/A1 Assets/Guest characters/A1.png",
    "/A1 Assets/Guest characters/CG1.png",
    "/A1 Assets/Girlies/Girl 3.png",
  ];

  return (
    <div className="relative min-h-screen text-black overflow-hidden">
      <FloatingAudioButton />
      {/* Light green gradient background matching flyer */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#B8E6B8] via-[#A8D8A8] to-[#98C898] -z-10" />

      {/* Clouds overlay */}
      <Clouds />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-24">
          {/* Back Button */}
          <Link
            href="/"
            prefetch
            className="absolute top-8 border-2 border-black p-4 rounded-full justify-center left-6 lg:left-10 flex items-center gap-2 text-black/70 hover:text-black transition-colors z-20 bg-white/80 backdrop-blur-sm"
          >
            <FiArrowLeft size={20} />
          </Link>

          {/* Top section with venue and time */}
          {/* <div className="flex justify-between items-start w-full mb-8 md:mb-12">
            <p className='font-["helvetica-extended"] text-sm md:text-base font-[400] text-black uppercase tracking-wide'>
              THE VAULT SOCIAL HOUSE
            </p>
            <p className='font-["helvetica-extended"] text-sm md:text-base font-[400] text-black uppercase tracking-wide'>
              11PM
            </p>
          </div> */}

          {/* Hero Content */}
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 md:space-y-12">
            {/* Logos row */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <div className="circle relative size-[60px] md:size-[80px] p-1 bg-black rounded-full">
                <Image
                  className="relative object-contain"
                  src="/A1 Assets/LOGOS/44-mascot.png"
                  alt="CG Logo"
                  width={100}
                  height={100}
                  priority
                />
              </div>
              <Image
                className="relative w-24 h-16 md:w-32 md:h-20"
                src="/A1 Assets/LOGOS/A1/A1-3.png"
                alt="A1 & Friends Logo"
                width={128}
                height={80}
                priority
              />
              <Image
                className="relative w-10 h-10 md:w-12 md:h-12"
                src="/A1 Assets/LOGOS/CG Logo PNG.png"
                alt="CG Logo"
                width={100}
                height={100}
                priority
              />
            </div>

            <div className="space-y-6 md:space-y-8">
              {/* Main title */}
              <h1 className='font-["helvetica-extended"] text-[4.5rem] md:text-[6.75rem] lg:text-[9rem] xl:text-[12rem] font-[700] text-black leading-[0.9] tracking-tight'>
                A1 & FRIENDS
              </h1>

              {/* Supporting acts */}
              <h2 className='font-["helvetica-extended"] text-3xl md:text-5xl lg:text-6xl font-[700] text-black leading-[0.9] tracking-tight'>
                WITH 44DB & CRUISE GANG
              </h2>

              {/* Date in serif font */}
              <p className='font-["canela"] text-2xl md:text-3xl lg:text-4xl text-black font-[400] mt-4'>
                {event.eventDate.toUpperCase()}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <RSVPModal eventName={event.eventName}>
                <button className="rounded-full border-2 cursor-pointer border-black bg-white px-8 py-4 text-base md:text-lg uppercase tracking-wide text-black font-medium transition hover:bg-black hover:text-white hover:scale-105">
                  RSVP guestlist
                </button>
              </RSVPModal>
              <ReserveTableModal>
                <button className="rounded-full cursor-pointer border-2 border-black px-8 py-4 text-base md:text-lg uppercase tracking-wide text-black font-medium transition hover:bg-black hover:text-white hover:scale-105">
                  Reserve a table
                </button>
              </ReserveTableModal>
            </div>
          </div>
        </div>
      </section>

      {/* Character illustrations at bottom matching flyer */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-16 md:pb-24">
        <div className="relative flex items-end justify-center gap-2 md:gap-4 w-full">
          {flyerCharacters.map((fileName, idx) => (
            <div key={idx} className="flex-1 flex justify-center items-end">
              <Image
                src={`${fileName}`}
                alt={`Character ${idx + 1}`}
                width={200}
                height={300}
                className={`w-full h-auto object-contain ${
                  idx === 2
                    ? "max-w-[140px] md:max-w-[210px]"
                    : "max-w-[120px] md:max-w-[180px]"
                }`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Additional Sections */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className='font-["helvetica-extended"] text-4xl md:text-5xl font-[400] text-black leading-tight'>
                About the Event
              </h2>
              <p className='font-["helvetica-extended"] text-lg md:text-xl text-black leading-relaxed'>
                On December 11th, A1 & Friends link up with 44DB & Cruise Gang,
                not just collaborators, but true family, to deliver a night
                built on community, culture, and the pure joy of Lagos nightlife
                at The Vault Social House. From 11PM till late, Ozzai, KC, Trill
                Xoe, Oreo, Nino, ObDrums, and CollinsofHype bring the energy,
                connection, and rhythm that feel like home to those of us who
                live and love this city. This one is for the people who
                understand the vibe, who know the scene, and who want the
                warmest, most familiar kickoff to their December. A1 & Friends ×
                44DB × Cruise Gang — a family affair to start the festivities
                right.
              </p>
            </div>

            <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-black">
              <Image
                src={event.eventImage}
                alt={event.eventName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="relative z-10 py-24 border-t border-black/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className='font-["helvetica-extended"] text-2xl font-[400] text-black/50 uppercase tracking-wide'>
                Date & Time
              </h3>
              <p className='font-["helvetica-extended"] text-xl text-black'>
                {event.eventDate}
              </p>
              <p className='font-["helvetica-extended"] text-lg text-black/70'>
                11PM TILL LATE
              </p>
            </div>

            <div className="space-y-4">
              <h3 className='font-["helvetica-extended"] text-2xl font-[400] text-black/50 uppercase tracking-wide'>
                Location
              </h3>
              <p className='font-["helvetica-extended"] text-xl text-black'>
                THE VAULT SOCIAL HOUSE
              </p>
              <p className='font-["helvetica-extended"] text-lg text-black/70'>
                Lagos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-24 border-t border-black/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center space-y-8">
          <h2 className='font-["helvetica-extended"] text-4xl md:text-5xl font-[400] text-black leading-tight'>
            Don&apos;t Miss Out
          </h2>
          <p className='font-["helvetica-extended"] text-xl text-black/70 max-w-2xl mx-auto'>
            Limited spots available. Secure your place now and be part of an
            extraordinary night.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <RSVPModal eventName={event.eventName}>
              <button className="rounded-full border-2 cursor-pointer border-black bg-white px-8 py-4 text-base md:text-lg uppercase tracking-wide text-black font-medium transition hover:bg-black hover:text-white hover:scale-105">
                RSVP guestlist
              </button>
            </RSVPModal>
            <ReserveTableModal>
              <button className="rounded-full cursor-pointer border-2 border-black px-8 py-4 text-base md:text-lg uppercase tracking-wide text-black font-medium transition hover:bg-black hover:text-white hover:scale-105">
                Reserve a table
              </button>
            </ReserveTableModal>
          </div>
        </div>
      </section>
    </div>
  );
}
