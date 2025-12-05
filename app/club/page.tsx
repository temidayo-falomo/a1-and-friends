"use client";

import GlbViewer from "@/components/glb-viewer";
import React from "react";

function ClubRender() {
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
        teardropPositions={[
          {
            id: 1,
            position: [-1.3, 0.25, -0.8],
            minimumSpendPerSeat: 3200000,
            reservationFee: 1600000,
          },
          {
            id: 2,
            position: [-0.3, 0.25, -0.8],
            minimumSpendPerSeat: 2800000,
            reservationFee: 1400000,
          },
          {
            id: 3,
            position: [-1.1, 0.3, 0.3],
            minimumSpendPerSeat: 700000,
            reservationFee: 150000,
          },
          {
            id: 4,
            position: [-0.2, 0.3, 0.1],
            minimumSpendPerSeat: 3000000,
            reservationFee: 1500000,
          },
          {
            id: 5,
            position: [0.2, 0.3, -0.1],
            minimumSpendPerSeat: 1000000,
            reservationFee: 200000,
          },
          {
            id: 6,
            position: [0.8, 0.2, 0],
            minimumSpendPerSeat: 1000000,
            reservationFee: 200000,
          },
          // {
          //   id: 7,
          //   position: [1.6, 0.2, 0.2],
          //   minimumSpendPerSeat: 3100000,
          //   reservationFee: 1550000,
          // },
          {
            id: 7,
            position: [1.6, 0.2, -0.15],
            minimumSpendPerSeat: 1000000,
            reservationFee: 200000,
          },
          {
            id: 8,
            position: [1.6, 0.2, -0.45],
            minimumSpendPerSeat: 1000000,
            reservationFee: 200000,
          },
          {
            id: 9,
            position: [1.6, 0.2, -0.75],
            minimumSpendPerSeat: 700000,
            reservationFee: 150000,
          },
          {
            id: 10,
            position: [1.3, 0.2, -0.75],
            minimumSpendPerSeat: 700000,
            reservationFee: 150000,
          },
          {
            id: 11,
            position: [0.9, 0.2, -0.75],
            minimumSpendPerSeat: 700000,
            reservationFee: 150000,
          },
          {
            id: 12,
            position: [0.5, 0.2, -0.75],
            minimumSpendPerSeat: 700000,
            reservationFee: 150000,
          },
        ]}
        vipPositions={[3, 9, 10, 11, 12]}
      />
    </div>
  );
}

export default ClubRender;
