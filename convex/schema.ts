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

  reservations: defineTable({
    eventId: v.string(),
    tableNumber: v.number(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    reservationFee: v.number(),
    minimumSpendPerSeat: v.number(),
    paymentReference: v.string(),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("success"),
      v.literal("failed")
    ),
    createdAt: v.number(),
  })
    .index("by_eventId", ["eventId"])
    .index("by_eventId_tableNumber", ["eventId", "tableNumber"]),
});
