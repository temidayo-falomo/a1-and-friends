"use client";

import GlbViewer from "@/components/glb-viewer";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function ClubRender() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.eventId as string;
  const [showPanel, setShowPanel] = useState(true);

  const pricing = useQuery(api.eventPricing.getByEventId, { eventId });

  if (pricing === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  if (!pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Event not found</h1>
          <p className="text-white/70">
            The event pricing for this page could not be found.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 border-2 border-white rounded-full hover:bg-white hover:text-black transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {showPanel && (
        <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-sm rounded-lg p-6 text-white space-y-3 max-w-[340px]">
          <button
            onClick={() => setShowPanel(false)}
            className="absolute top-4 cursor-pointer right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Close panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <h2 className="text-xl font-semibold">Select a table to Reserve</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white"></div>
              <span>White icons indicate tables are available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span>Red icons indicate tables are reserved</span>
            </div>
          </div>
        </div>
      )}
      <GlbViewer
        url="/3d/club-compressed.glb"
        width="100vw"
        height="100vh"
        teardropPositions={pricing.tablePositions.map((tp) => ({
          id: tp.id,
          position: tp.position as [number, number, number],
          minimumSpendPerSeat: tp.minimumSpendPerSeat,
          reservationFee: tp.reservationFee,
        }))}
        vipPositions={pricing.vipPositions}
      />
    </div>
  );
}

export default ClubRender;
