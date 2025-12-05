"use client";

import GlbViewer from "@/components/glb-viewer";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { getPricingByEventId } from "@/data/club-pricing";

function ClubRender() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.eventId as string;

  const pricing = getPricingByEventId(eventId);

  if (!pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Event not found</h1>
          <p className="text-white/70">The event pricing for this page could not be found.</p>
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
      <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-sm rounded-lg p-6 text-white space-y-3 max-w-xs">
        <h2 className="text-xl font-semibold">Select a table to Reserve</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-400"></div>
            <span>White icons indicate tables are available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>Red icons indicate tables are reserved</span>
          </div>
        </div>
      </div>
      <GlbViewer
        url="/3d/club-compressed.glb"
        width="100vw"
        height="100vh"
        teardropPositions={pricing.tablePositions}
        vipPositions={pricing.vipPositions}
      />
    </div>
  );
}

export default ClubRender;

