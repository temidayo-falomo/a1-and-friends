"use client";

import { usePreloadedQuery, Preloaded } from "convex/react";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import CruiseGang44DB from "@/components/events/CruiseGang44DB";
import Waved from "@/components/events/Waved";
import SVDanceForever from "@/components/events/SVDanceForever";
import GidicruiseWestway from "@/components/events/GidicruiseWestway";

interface EventPageClientProps {
  preloadedEvent: Preloaded<typeof api.events.getById>;
  eventId: string;
}

export default function EventPageClient({
  preloadedEvent,
  eventId,
}: EventPageClientProps) {
  const event = usePreloadedQuery(preloadedEvent);

  if (!event) {
    notFound();
  }

  // Render the appropriate component based on eventId
  switch (eventId) {
    case "cruise-gang-44db":
      return <CruiseGang44DB event={event} />;
    case "waved":
      return <Waved event={event} />;
    case "sv-dance-forever":
      return <SVDanceForever event={event} />;
    case "gidicruise-westway":
      return <GidicruiseWestway event={event} />;
    default:
      notFound();
  }
}
