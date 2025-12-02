export interface Event {
  eventId: string;
  eventName: string;
  eventDate: string;
  eventCategory: string;
  eventImage: string;
}

export const events: Event[] = [
  {
    eventId: "cruise-gang-44db",
    eventName: "Cruise Gang & 44DB",
    eventDate: "11th December",
    eventCategory: "Event",
    eventImage: "/posters/44db.png",
  },
  {
    eventId: "waved",
    eventName: "Waved",
    eventDate: "20th December",
    eventCategory: "Event",
    eventImage: "/posters/waved.png",
  },
  {
    eventId: "coming-soon-1",
    eventName: "Coming Soon",
    eventDate: "TBA",
    eventCategory: "Event",
    eventImage: "/paper.webp", // Placeholder image
  },
  {
    eventId: "coming-soon-2",
    eventName: "Coming Soon",
    eventDate: "TBA",
    eventCategory: "Event",
    eventImage: "/paper.webp", // Placeholder image
  },
];

export function getEventById(eventId: string): Event | undefined {
  return events.find((event) => event.eventId === eventId);
}
