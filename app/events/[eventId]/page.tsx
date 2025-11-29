import { notFound } from "next/navigation";
import Image from "next/image";
import { getEventById } from "@/data/events";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

interface EventPageProps {
  params: Promise<{
    eventId: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { eventId } = await params;
  const event = getEventById(eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src={event.eventImage}
              alt={event.eventName}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-24">
          {/* Back Button */}
          <Link
            href="/"
            prefetch
            className="absolute top-8 left-6 lg:left-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors z-20"
          >
            <FiArrowLeft size={20} />
            <span className='font-["helvetica-extended"] text-sm'>
              Back to Events
            </span>
          </Link>

          {/* Hero Content */}
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <div className="space-y-6">
              <span className='inline-block font-["helvetica-extended"] font-[400] text-black text-sm bg-white px-4 py-2 rounded-full'>
                {event.eventCategory}
              </span>

              <h1 className='font-["helvetica-extended"] text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-[400] leading-[0.9] tracking-tight'>
                {event.eventName}
              </h1>

              <p className='font-["helvetica-extended"] text-3xl md:text-4xl lg:text-5xl text-white/90 mt-6'>
                {event.eventDate}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button className="rounded-full border cursor-pointer border-white bg-white px-8 py-4 text-base md:text-lg uppercase tracking-wide text-black font-medium transition hover:bg-white/90 hover:scale-105">
                RSVP guestlist
              </button>
              <button className="rounded-full cursor-pointer border-2 border-white px-8 py-4 text-base md:text-lg uppercase tracking-wide text-white font-medium transition hover:bg-white/10 hover:border-[#ffc659] hover:text-[#ffc659] hover:scale-105">
                Reserve a table
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="relative z-10 bg-black py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className='font-["helvetica-extended"] text-4xl md:text-5xl font-[400] leading-tight'>
                About the Event
              </h2>
              <p className='font-["helvetica-extended"] text-lg md:text-xl text-white/70 leading-relaxed'>
                Join us for an unforgettable night of music, energy, and
                celebration. Experience the best in entertainment with
                world-class DJs and an atmosphere that will keep you moving all
                night long.
              </p>
            </div>

            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
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
      <section className="relative z-10 bg-black py-24 border-t border-white/10">
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
                10:00 PM - 4:00 AM
              </p>
            </div>

            <div className="space-y-4">
              <h3 className='font-["helvetica-extended"] text-2xl font-[400] text-white/50 uppercase tracking-wide'>
                Location
              </h3>
              <p className='font-["helvetica-extended"] text-xl text-white'>
                VI Lagos
              </p>
              <p className='font-["helvetica-extended"] text-lg text-white/70'>
                Victoria Island, Lagos
              </p>
            </div>

            <div className="space-y-4">
              <h3 className='font-["helvetica-extended"] text-2xl font-[400] text-white/50 uppercase tracking-wide'>
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
      <section className="relative z-10 bg-black py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center space-y-8">
          <h2 className='font-["helvetica-extended"] text-4xl md:text-5xl font-[400] leading-tight'>
            Don&apos;t Miss Out
          </h2>
          <p className='font-["helvetica-extended"] text-xl text-white/70 max-w-2xl mx-auto'>
            Limited spots available. Secure your place now and be part of an
            extraordinary night.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="rounded-full border cursor-pointer border-white bg-white px-8 py-4 text-base md:text-lg uppercase tracking-wide text-black font-medium transition hover:bg-white/90 hover:scale-105">
              RSVP guestlist
            </button>
            <button className="rounded-full cursor-pointer border-2 border-white px-8 py-4 text-base md:text-lg uppercase tracking-wide text-white font-medium transition hover:bg-white/10 hover:border-[#ffc659] hover:text-[#ffc659] hover:scale-105">
              Reserve a table
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
