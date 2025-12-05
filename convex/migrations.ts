import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Migration script to seed initial data
export const seedEvents = mutation({
  handler: async (ctx) => {
    const events = [
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
        eventImage: "/paper.webp",
      },
      {
        eventId: "coming-soon-2",
        eventName: "Coming Soon",
        eventDate: "TBA",
        eventCategory: "Event",
        eventImage: "/paper.webp",
      },
    ];

    // Check if data already exists
    const existingEvents = await ctx.db.query("events").collect();
    if (existingEvents.length > 0) {
      return { message: "Events already seeded", count: existingEvents.length };
    }

    // Insert events
    for (const event of events) {
      await ctx.db.insert("events", event);
    }

    return { message: "Events seeded successfully", count: events.length };
  },
});

export const seedEventPricing = mutation({
  handler: async (ctx) => {
    // Base table positions (same for all events)
    const baseTablePositions = [
      { id: 1, position: [-1.3, 0.25, -0.8] },
      { id: 2, position: [-0.3, 0.25, -0.8] },
      { id: 3, position: [-1.1, 0.3, 0.3] },
      { id: 4, position: [-0.2, 0.3, 0.1] },
      { id: 5, position: [0.2, 0.3, -0.1] },
      { id: 6, position: [0.8, 0.2, 0] },
      { id: 7, position: [1.6, 0.2, 0] },
      { id: 8, position: [1.6, 0.2, -0.3] },
      { id: 9, position: [1.6, 0.2, -0.6] },
      { id: 10, position: [1.3, 0.2, -0.75] },
      { id: 11, position: [0.9, 0.2, -0.75] },
      { id: 12, position: [0.5, 0.2, -0.75] },
    ];

    const wavedPricing = {
      eventId: "waved",
      tablePositions: [
        {
          ...baseTablePositions[0],
          minimumSpendPerSeat: 3200000,
          reservationFee: 1600000,
        },
        {
          ...baseTablePositions[1],
          minimumSpendPerSeat: 2800000,
          reservationFee: 1400000,
        },
        {
          ...baseTablePositions[2],
          minimumSpendPerSeat: 700000,
          reservationFee: 150000,
        },
        {
          ...baseTablePositions[3],
          minimumSpendPerSeat: 3000000,
          reservationFee: 1500000,
        },
        {
          ...baseTablePositions[4],
          minimumSpendPerSeat: 1200000,
          reservationFee: 300000,
        },
        {
          ...baseTablePositions[5],
          minimumSpendPerSeat: 1200000,
          reservationFee: 300000,
        },
        {
          ...baseTablePositions[6],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
        {
          ...baseTablePositions[7],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
        {
          ...baseTablePositions[8],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
        {
          ...baseTablePositions[9],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
        {
          ...baseTablePositions[10],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
        {
          ...baseTablePositions[11],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
      ],
      vipPositions: [3, 9, 10, 11, 12],
    };

    const cruiseGang44dbPricing = {
      eventId: "cruise-gang-44db",
      tablePositions: baseTablePositions.map((table) => ({
        ...table,
        minimumSpendPerSeat: 500000,
        reservationFee: 50000,
      })),
      vipPositions: [3, 9, 10, 11, 12],
    };

    // Check if data already exists
    const existingPricing = await ctx.db.query("eventPricing").collect();
    if (existingPricing.length > 0) {
      return {
        message: "Event pricing already seeded",
        count: existingPricing.length,
      };
    }

    // Insert pricing data
    await ctx.db.insert("eventPricing", wavedPricing);
    await ctx.db.insert("eventPricing", cruiseGang44dbPricing);

    return { message: "Event pricing seeded successfully", count: 2 };
  },
});

// Update existing event pricing (useful for updating pricing after initial seed)
export const updateEventPricing = mutation({
  handler: async (ctx) => {
    // Base table positions (same for all events)
    const baseTablePositions = [
      { id: 1, position: [-1.3, 0.25, -0.8] },
      { id: 2, position: [-0.3, 0.25, -0.8] },
      { id: 3, position: [-1.1, 0.3, 0.3] },
      { id: 4, position: [-0.2, 0.3, 0.1] },
      { id: 5, position: [0.2, 0.3, -0.1] },
      { id: 6, position: [0.8, 0.2, 0] },
      { id: 7, position: [1.6, 0.2, 0] },
      { id: 8, position: [1.6, 0.2, -0.3] },
      { id: 9, position: [1.6, 0.2, -0.6] },
      { id: 10, position: [1.3, 0.2, -0.75] },
      { id: 11, position: [0.9, 0.2, -0.75] },
      { id: 12, position: [0.5, 0.2, -0.75] },
    ];

    const wavedPricing = {
      eventId: "waved",
      tablePositions: [
        {
          ...baseTablePositions[0],
          minimumSpendPerSeat: 3200000,
          reservationFee: 1600000,
        },
        {
          ...baseTablePositions[1],
          minimumSpendPerSeat: 2800000,
          reservationFee: 1400000,
        },
        {
          ...baseTablePositions[2],
          minimumSpendPerSeat: 700000,
          reservationFee: 150000,
        },
        {
          ...baseTablePositions[3],
          minimumSpendPerSeat: 3000000,
          reservationFee: 1500000,
        },
        {
          ...baseTablePositions[4],
          minimumSpendPerSeat: 1200000,
          reservationFee: 300000,
        },
        {
          ...baseTablePositions[5],
          minimumSpendPerSeat: 1200000,
          reservationFee: 300000,
        },
        {
          ...baseTablePositions[6],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
        {
          ...baseTablePositions[7],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
        {
          ...baseTablePositions[8],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
        {
          ...baseTablePositions[9],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
        {
          ...baseTablePositions[10],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
        {
          ...baseTablePositions[11],
          minimumSpendPerSeat: 1000000,
          reservationFee: 200000,
        },
      ],
      vipPositions: [3, 9, 10, 11, 12],
    };

    const cruiseGang44dbPricing = {
      eventId: "cruise-gang-44db",
      tablePositions: baseTablePositions.map((table) => ({
        ...table,
        minimumSpendPerSeat: 500000,
        reservationFee: 50000,
      })),
      vipPositions: [3, 9, 10, 11, 12],
    };

    // Find and update existing pricing
    const existingWaved = await ctx.db
      .query("eventPricing")
      .withIndex("by_eventId", (q) => q.eq("eventId", "waved"))
      .first();

    const existingCruiseGang = await ctx.db
      .query("eventPricing")
      .withIndex("by_eventId", (q) => q.eq("eventId", "cruise-gang-44db"))
      .first();

    let updatedCount = 0;

    if (existingWaved) {
      await ctx.db.patch(existingWaved._id, wavedPricing);
      updatedCount++;
    } else {
      await ctx.db.insert("eventPricing", wavedPricing);
      updatedCount++;
    }

    if (existingCruiseGang) {
      await ctx.db.patch(existingCruiseGang._id, cruiseGang44dbPricing);
      updatedCount++;
    } else {
      await ctx.db.insert("eventPricing", cruiseGang44dbPricing);
      updatedCount++;
    }

    return {
      message: "Event pricing updated successfully",
      count: updatedCount,
    };
  },
});
