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
  // {
  //   eventId: "sv-dance-forever",
  //   eventName: "SV Presents: The Dance Is Forever",
  //   eventDate: "25th December",
  //   eventCategory: "Event",
  //   eventImage: "/A1 Assets/Guest characters/SV2.png",
  // },
  // {
  //   eventId: "gidicruise-westway",
  //   eventName: "Gidicruise & Westway",
  //   eventDate: "1st January",
  //   eventCategory: "Event",
  //   eventImage: "/A1 Assets/Guest characters/Gidi cruise.png",
  // },
];

export function getEventById(eventId: string): Event | undefined {
  return events.find((event) => event.eventId === eventId);
}
