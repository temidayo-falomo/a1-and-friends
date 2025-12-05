import { notFound } from "next/navigation";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import CruiseGang44DB from "@/components/events/CruiseGang44DB";
import Waved from "@/components/events/Waved";
import SVDanceForever from "@/components/events/SVDanceForever";
import GidicruiseWestway from "@/components/events/GidicruiseWestway";
import EventPageClient from "./EventPageClient";

interface EventPageProps {
  params: Promise<{
    eventId: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { eventId } = await params;
  const preloadedEvent = await preloadQuery(api.events.getById, { eventId });

  return <EventPageClient preloadedEvent={preloadedEvent} eventId={eventId} />;
}
