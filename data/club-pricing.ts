export interface TablePosition {
  id: number;
  position: [number, number, number];
  minimumSpendPerSeat: number;
  reservationFee: number;
}

export interface EventPricing {
  eventId: string;
  tablePositions: TablePosition[];
  vipPositions: number[];
}

// Base table positions (same for all events)
const baseTablePositions: Omit<TablePosition, "minimumSpendPerSeat" | "reservationFee">[] = [
  { id: 1, position: [-1.3, 0.25, -0.8] },
  { id: 2, position: [-0.3, 0.25, -0.8] },
  { id: 3, position: [-1.1, 0.3, 0.3] },
  { id: 4, position: [-0.2, 0.3, 0.1] },
  { id: 5, position: [0.2, 0.3, -0.1] },
  { id: 6, position: [0.8, 0.2, 0] },
  { id: 7, position: [1.6, 0.2, -0.15] },
  { id: 8, position: [1.6, 0.2, -0.45] },
  { id: 9, position: [1.6, 0.2, -0.75] },
  { id: 10, position: [1.3, 0.2, -0.75] },
  { id: 11, position: [0.9, 0.2, -0.75] },
  { id: 12, position: [0.5, 0.2, -0.75] },
];

// Waved event pricing (current pricing)
const wavedPricing: EventPricing = {
  eventId: "waved",
  tablePositions: [
    { ...baseTablePositions[0], minimumSpendPerSeat: 3200000, reservationFee: 1600000 },
    { ...baseTablePositions[1], minimumSpendPerSeat: 2800000, reservationFee: 1400000 },
    { ...baseTablePositions[2], minimumSpendPerSeat: 700000, reservationFee: 150000 },
    { ...baseTablePositions[3], minimumSpendPerSeat: 3000000, reservationFee: 1500000 },
    { ...baseTablePositions[4], minimumSpendPerSeat: 1000000, reservationFee: 200000 },
    { ...baseTablePositions[5], minimumSpendPerSeat: 1000000, reservationFee: 200000 },
    { ...baseTablePositions[6], minimumSpendPerSeat: 1000000, reservationFee: 200000 },
    { ...baseTablePositions[7], minimumSpendPerSeat: 1000000, reservationFee: 200000 },
    { ...baseTablePositions[8], minimumSpendPerSeat: 700000, reservationFee: 150000 },
    { ...baseTablePositions[9], minimumSpendPerSeat: 700000, reservationFee: 150000 },
    { ...baseTablePositions[10], minimumSpendPerSeat: 700000, reservationFee: 150000 },
    { ...baseTablePositions[11], minimumSpendPerSeat: 700000, reservationFee: 150000 },
  ],
  vipPositions: [3, 9, 10, 11, 12],
};

// Cruise Gang & 44DB event pricing (500k min spend & 50k reservation fee for all tables)
const cruiseGang44dbPricing: EventPricing = {
  eventId: "cruise-gang-44db",
  tablePositions: baseTablePositions.map((table) => ({
    ...table,
    minimumSpendPerSeat: 500000,
    reservationFee: 50000,
  })),
  vipPositions: [3, 9, 10, 11, 12],
};

export const eventPricing: EventPricing[] = [wavedPricing, cruiseGang44dbPricing];

export function getPricingByEventId(eventId: string): EventPricing | undefined {
  return eventPricing.find((pricing) => pricing.eventId === eventId);
}

