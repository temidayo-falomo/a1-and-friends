import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import RSVPModal from "@/components/rsvp-modal";
import ReserveTableModal from "@/components/reserve-table-modal";
import { Event } from "@/data/events";
import CloudsDark from "@/components/CloudsDark";
import { FloatingAudioButton } from "../FloatingAudioButton";

interface WavedProps {
  event: Event;
}

export default function Waved({ event }: WavedProps) {
  // Select 5 characters to match the flyer - using available characters
  const flyerCharacters = [
    "/A1 Assets/Girlies/Girl 2.png",
    "/A1 Assets/Girlies/Girl 1.png",
    "/A1 Assets/Guest characters/A1.png",
    "/A1 Assets/Guest characters/44DB2.png",
    "/A1 Assets/Girlies/Girl 3.png",
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Clouds overlay */}
      <CloudsDark />

      <FloatingAudioButton />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-24">
          {/* Back Button */}
          <Link
            href="/"
            prefetch
            className="absolute top-8 border-2 border-white/30 p-4 rounded-full justify-center left-6 lg:left-10 flex items-center gap-2 text-white/70 hover:text-white hover:border-white transition-colors z-20 bg-black/50 backdrop-blur-sm"
          >
            <FiArrowLeft size={20} />
          </Link>

          {/* Hero Content */}
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 md:space-y-12">
            {/* A1 & Friends Logo */}
            <div className="flex items-center justify-center">
              <Image
                className="w-[150px]"
                src="/A1 Assets/LOGOS/A1/A1-3.png"
                alt="A1 & Friends Logo"
                width={200}
                height={200}
                priority
              />
            </div>

            <div className="space-y-6 md:space-y-8">
              {/* Main title - A1 & FRIENDS with glowing yellow effect */}
              <h1
                className='font-["helvetica-extended"] text-[4.5rem] md:text-[6.75rem] lg:text-[9rem] xl:text-[12rem] font-[700] leading-[0.9] tracking-tight'
                style={{
                  color: "#FFD700",
                  textShadow:
                    "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 165, 0, 0.6), 2px 2px 0px rgba(255, 140, 0, 0.8)",
                }}
              >
                A1 & FRIENDS
              </h1>

              {/* WITH in glowing yellow */}
              <h2
                className='font-["helvetica-extended"] text-3xl md:text-5xl lg:text-6xl font-[700] leading-[0.9] tracking-tight'
                style={{
                  color: "#FFD700",
                  textShadow:
                    "0 0 15px rgba(255, 215, 0, 0.7), 0 0 30px rgba(255, 165, 0, 0.5)",
                }}
              >
                WITH
              </h2>

              {/* waved! with metallic gold/orange glossy effect */}
              <div className="flex items-center justify-center mt-[-70px] md:mt-[-130px]">
                <Image
                  className="relative w-[250px] md:w-[500px]"
                  src="/A1 Assets/LOGOS/waved-prev.png"
                  alt="waved!"
                  width={200}
                  height={200}
                  priority
                />
              </div>

              {/* Date in serif font, beige/cream color */}
              <p className='font-["canela"] text-2xl md:text-3xl lg:text-4xl text-[#F5E6D3] font-[400] mt-4'>
                {event.eventDate.toUpperCase()}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <RSVPModal eventName={event.eventName}>
                <button className="rounded-full border-2 cursor-pointer border-white bg-white px-8 py-4 text-base md:text-lg uppercase tracking-wide text-black font-medium transition hover:bg-black hover:text-white hover:scale-105">
                  RSVP guestlist
                </button>
              </RSVPModal>
              {/* <ReserveTableModal eventName={event.eventName}> */}
              <Link
                href="/club/waved"
                className="rounded-full cursor-pointer border-2 border-white px-8 py-4 text-base md:text-lg uppercase tracking-wide text-white font-medium transition hover:bg-white hover:text-black hover:scale-105"
              >
                Reserve a table
              </Link>
              {/* </ReserveTableModal> */}
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
              <h2 className='font-["helvetica-extended"] text-4xl md:text-5xl font-[400] leading-tight text-white'>
                About the Event
              </h2>
              <p className='font-["helvetica-extended"] text-lg md:text-xl text-white/70 leading-relaxed'>
                On December 20th, A1 & Friends team up with Waved to host the
                ultimate Welcome to Lagos club night at The Vault Social House.
                From 11PM till late, immerse yourself in the purest Lagos energy
                as Ozzai, Bowo, Kal$, DJ Muniis, 2Sevv, DJ K.O (Sabi DJ), Atobz,
                ObDrums, and CollinsofHype take you on a sonic journey through
                all the sounds the city loves. If you’re landing in the city,
                returning home, or just kicking off your Detty December, this is
                your first stop. A1 & Friends with Waved. Welcome to Lagos!
              </p>
            </div>

            <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-white/30">
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
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className='font-["helvetica-extended"] text-2xl font-[400] text-white/50 uppercase tracking-wide'>
                Date & Time
              </h3>
              <p className='font-["helvetica-extended"] text-xl text-white'>
                {event.eventDate}
              </p>
              <p className='font-["helvetica-extended"] text-lg text-white/70'>
                11PM TILL LATE
              </p>
            </div>

            <div className="space-y-4">
              <h3 className='font-["helvetica-extended"] text-2xl font-[400] text-white/50 uppercase tracking-wide'>
                Location
              </h3>
              <p className='font-["helvetica-extended"] text-xl text-white'>
                THE VAULT SOCIAL HOUSE
              </p>
              <p className='font-["helvetica-extended"] text-lg text-white/70'>
                Lagos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-24 ">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center space-y-8">
          <h2 className='font-["helvetica-extended"] text-4xl md:text-5xl font-[400] leading-tight text-white'>
            Don&apos;t Miss Out
          </h2>
          <p className='font-["helvetica-extended"] text-xl text-white/70 max-w-2xl mx-auto'>
            Limited spots available. Secure your place now and be part of an
            extraordinary night.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <RSVPModal eventName={event.eventName}>
              <button className="rounded-full border-2 cursor-pointer border-white bg-white px-8 py-4 text-base md:text-lg uppercase tracking-wide text-black font-medium transition hover:bg-black hover:text-white hover:scale-105">
                RSVP guestlist
              </button>
            </RSVPModal>
            <ReserveTableModal>
              <button className="rounded-full cursor-pointer border-2 border-white px-8 py-4 text-base md:text-lg uppercase tracking-wide text-white font-medium transition hover:bg-white hover:text-black hover:scale-105">
                Reserve a table
              </button>
            </ReserveTableModal>
          </div>
        </div>
      </section>
    </div>
  );
}
