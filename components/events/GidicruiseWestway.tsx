import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import RSVPModal from "@/components/rsvp-modal";
import ReserveTableModal from "@/components/reserve-table-modal";
import { Event } from "@/data/events";

interface GidicruiseWestwayProps {
  event: Event;
}

export default function GidicruiseWestway({ event }: GidicruiseWestwayProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-900 via-black to-blue-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src={event.eventImage}
              alt={event.eventName}
              fill
              className="object-cover opacity-35"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/80 via-black/60 to-blue-900/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.75)_100%)]" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-24">
          {/* Back Button */}
          <Link
            href="/"
            prefetch
            className="absolute top-8 border-2 border-cyan-400 p-4 rounded-full justify-center left-6 lg:left-10 flex items-center gap-2 text-cyan-200 hover:text-white hover:border-white transition-colors z-20"
          >
            <FiArrowLeft size={20} />
          </Link>

          {/* Hero Content */}
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <div className="space-y-6">
              <span className='inline-block font-["helvetica-extended"] font-[400] text-black text-sm bg-gradient-to-r from-cyan-400 to-blue-400 px-4 py-2 rounded-full'>
                A1 & Friends
              </span>

              <h1 className='font-["helvetica-extended"] text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-[400] leading-[0.9] tracking-tight bg-gradient-to-r from-cyan-200 via-white to-blue-200 bg-clip-text text-transparent'>
                {event.eventName}
              </h1>

              <p className='font-["helvetica-extended"] text-3xl md:text-4xl lg:text-5xl text-cyan-200 mt-6'>
                {event.eventDate}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <RSVPModal eventName={event.eventName}>
                <button className="rounded-full border cursor-pointer border-cyan-400 bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base md:text-lg uppercase tracking-wide text-white font-medium transition hover:from-cyan-600 hover:to-blue-600 hover:scale-105">
                  RSVP guestlist
                </button>
              </RSVPModal>
              <ReserveTableModal>
                <button className="rounded-full cursor-pointer border-2 border-cyan-400 px-8 py-4 text-base md:text-lg uppercase tracking-wide text-cyan-200 font-medium transition hover:bg-cyan-500/20 hover:border-cyan-300 hover:text-white hover:scale-105">
                  Reserve a table
                </button>
              </ReserveTableModal>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-cyan-400/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="relative z-10 bg-black/50 backdrop-blur-sm py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className='font-["helvetica-extended"] text-4xl md:text-5xl font-[400] leading-tight bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent'>
                About the Event
              </h2>
              <p className='font-["helvetica-extended"] text-lg md:text-xl text-white/70 leading-relaxed'>
                Join us for an unforgettable night of music, energy, and
                celebration. Experience the best in entertainment with
                world-class DJs and an atmosphere that will keep you moving all
                night long.
              </p>
            </div>

            <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-cyan-500/30">
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
      <section className="relative z-10 bg-black/30 py-24 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className='font-["helvetica-extended"] text-2xl font-[400] text-cyan-300/50 uppercase tracking-wide'>
                Date & Time
              </h3>
              <p className='font-["helvetica-extended"] text-xl text-white'>
                {event.eventDate}
              </p>
              <p className='font-["helvetica-extended"] text-lg text-white/70'>
                11pm to later
              </p>
            </div>

            <div className="space-y-4">
              <h3 className='font-["helvetica-extended"] text-2xl font-[400] text-cyan-300/50 uppercase tracking-wide'>
                Location
              </h3>
              <p className='font-["helvetica-extended"] text-xl text-white'>
                VI Lagos
              </p>
              <p className='font-["helvetica-extended"] text-lg text-white/70'>
                Lagos
              </p>
            </div>

            <div className="space-y-4">
              <h3 className='font-["helvetica-extended"] text-2xl font-[400] text-cyan-300/50 uppercase tracking-wide'>
                Dress Code
              </h3>
              <p className='font-["helvetica-extended"] text-xl text-white'>
                Upscale Casual
              </p>
              <p className='font-["helvetica-extended"] text-lg text-white/70'>
                Dress to impress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 bg-black/50 backdrop-blur-sm py-24 border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center space-y-8">
          <h2 className='font-["helvetica-extended"] text-4xl md:text-5xl font-[400] leading-tight bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent'>
            Don&apos;t Miss Out
          </h2>
          <p className='font-["helvetica-extended"] text-xl text-white/70 max-w-2xl mx-auto'>
            Limited spots available. Secure your place now and be part of an
            extraordinary night.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <RSVPModal eventName={event.eventName}>
              <button className="rounded-full border cursor-pointer border-cyan-400 bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base md:text-lg uppercase tracking-wide text-white font-medium transition hover:from-cyan-600 hover:to-blue-600 hover:scale-105">
                RSVP guestlist
              </button>
            </RSVPModal>
            <ReserveTableModal>
              <button className="rounded-full cursor-pointer border-2 border-cyan-400 px-8 py-4 text-base md:text-lg uppercase tracking-wide text-cyan-200 font-medium transition hover:bg-cyan-500/20 hover:border-cyan-300 hover:text-white hover:scale-105">
                Reserve a table
              </button>
            </ReserveTableModal>
          </div>
        </div>
      </section>
    </div>
  );
}
