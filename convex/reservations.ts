import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all reservations for an event
export const getByEventId = query({
  args: { eventId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reservations")
      .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
      .collect();
  },
});

// Query to check if a specific table is reserved
export const isTableReserved = query({
  args: { eventId: v.string(), tableNumber: v.number() },
  handler: async (ctx, args) => {
    const reservation = await ctx.db
      .query("reservations")
      .withIndex("by_eventId_tableNumber", (q) =>
        q.eq("eventId", args.eventId).eq("tableNumber", args.tableNumber)
      )
      .filter((q) => q.eq(q.field("paymentStatus"), "success"))
      .first();

    return reservation !== null;
  },
});

// Mutation to create a reservation (before payment)
export const createReservation = mutation({
  args: {
    eventId: v.string(),
    tableNumber: v.number(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    reservationFee: v.number(),
    minimumSpendPerSeat: v.number(),
    paymentReference: v.string(),
  },
  handler: async (ctx, args) => {
    // Tables 1, 2, and 4 are always reserved by default
    const alwaysReservedTables = [1, 2, 4];
    if (alwaysReservedTables.includes(args.tableNumber)) {
      throw new Error("This table is reserved by default and cannot be booked");
    }

    // Check if table is already reserved
    const existing = await ctx.db
      .query("reservations")
      .withIndex("by_eventId_tableNumber", (q) =>
        q.eq("eventId", args.eventId).eq("tableNumber", args.tableNumber)
      )
      .filter((q) => q.eq(q.field("paymentStatus"), "success"))
      .first();

    if (existing) {
      throw new Error("Table is already reserved");
    }

    return await ctx.db.insert("reservations", {
      eventId: args.eventId,
      tableNumber: args.tableNumber,
      customerName: args.customerName,
      customerEmail: args.customerEmail,
      customerPhone: args.customerPhone,
      reservationFee: args.reservationFee,
      minimumSpendPerSeat: args.minimumSpendPerSeat,
      paymentReference: args.paymentReference,
      paymentStatus: "pending",
      createdAt: Date.now(),
    });
  },
});

// Query to get all pending reservations (for scheduled verification)
export const getPendingReservations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("reservations")
      .filter((q) => q.eq(q.field("paymentStatus"), "pending"))
      .collect();
  },
});

// Mutation to update payment status after verification
export const updatePaymentStatus = mutation({
  args: {
    paymentReference: v.string(),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("success"),
      v.literal("failed")
    ),
  },
  handler: async (ctx, args) => {
    const reservation = await ctx.db
      .query("reservations")
      .filter((q) => q.eq(q.field("paymentReference"), args.paymentReference))
      .first();

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    await ctx.db.patch(reservation._id, {
      paymentStatus: args.paymentStatus,
    });

    return reservation._id;
  },
});

