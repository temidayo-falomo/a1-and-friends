"use client";

import GlbViewer from "@/components/glb-viewer";
import React from "react";

function ClubRender() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <GlbViewer
        url="/3d/club-compressed.glb"
        width="100vw"
        height="100vh"
        teardropPositions={[
          { id: 1, position: [-1.3, 0.25, -0.8] },
          { id: 2, position: [-0.3, 0.25, -0.8] },
          { id: 3, position: [-1.1, 0.3, 0.3] },
          { id: 4, position: [-0.2, 0.3, 0.1] },
          { id: 5, position: [0.2, 0.3, -0.1] },
          { id: 6, position: [0.8, 0.2, 0] },
          { id: 7, position: [1.6, 0.2, 0.2] },
          { id: 8, position: [1.6, 0.2, -0.15] },
          { id: 9, position: [1.6, 0.2, -0.45] },
          { id: 10, position: [1.6, 0.2, -0.75] },
          { id: 11, position: [1.3, 0.2, -0.75] },
          { id: 12, position: [0.9, 0.2, -0.75] },
          { id: 13, position: [0.5, 0.2, -0.75] },
        ]}
      />
    </div>
  );
}

export default ClubRender;
