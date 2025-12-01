import { notFound } from "next/navigation";
import { getEventById } from "@/data/events";
import CruiseGang44DB from "@/components/events/CruiseGang44DB";
import Waved from "@/components/events/Waved";
import SVDanceForever from "@/components/events/SVDanceForever";
import GidicruiseWestway from "@/components/events/GidicruiseWestway";

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
