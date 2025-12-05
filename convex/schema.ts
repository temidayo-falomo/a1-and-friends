import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    eventId: v.string(),
    eventName: v.string(),
    eventDate: v.string(),
    eventCategory: v.string(),
    eventImage: v.string(),
  }).index("by_eventId", ["eventId"]),

  eventPricing: defineTable({
    eventId: v.string(),
    tablePositions: v.array(
      v.object({
        id: v.number(),
        position: v.array(v.number()),
        minimumSpendPerSeat: v.number(),
        reservationFee: v.number(),
      })
    ),
    vipPositions: v.array(v.number()),
  }).index("by_eventId", ["eventId"]),
});

