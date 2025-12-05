"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Grid } from "@react-three/drei";
import * as THREE from "three";
import TeardropMarker from "./teardrop-marker";
import TeardropModal from "./teardrop-modal";

type GlbModelProps = {
  url: string;
  onLoad?: () => void;
};

const GlbModel = ({ url, onLoad }: GlbModelProps) => {
  const modelRef = useRef<THREE.Group>(null);
  const centeredRef = useRef(false);
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (scene && !centeredRef.current) {
      try {
        // Calculate bounding box
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        console.log("Model bounds:", { center, size });

        // Calculate scale to fit in view
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = maxDim > 0 ? 4 / maxDim : 1;

        console.log("Scaling model:", { maxDim, scale });

        // Center and scale the model
        scene.scale.multiplyScalar(scale);
        scene.position.sub(center.multiplyScalar(scale));

        console.log("Model positioned at:", scene.position);
        console.log("Model scale:", scene.scale);

        centeredRef.current = true;
        onLoad?.();
      } catch (error) {
        console.error("Error centering model:", error);
        onLoad?.();
      }
    }
  }, [scene, onLoad]);

  return <primitive ref={modelRef} object={scene} />;
};

type TeardropPosition = {
  id: number;
  position: [number, number, number];
  minimumSpendPerSeat?: number;
  reservationFee?: number;
};

type GlbViewerProps = {
  url?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  teardropPositions?: TeardropPosition[];
  minimumSpendPerSeat?: number;
  reservationFee?: number;
  vipPositions?: number[];
};

const GlbViewer = ({
  url = "/3d/Untitled.glb",
  width = "100%",
  height = "600px",
  className = "",
  teardropPositions = [],
  minimumSpendPerSeat,
  reservationFee,
  vipPositions = [],
}: GlbViewerProps) => {
  const [loading, setLoading] = useState(true);
  const [selectedTeardrops, setSelectedTeardrops] = useState<Set<number>>(
    new Set([1, 2, 4])
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTeardrop, setCurrentTeardrop] = useState<number | null>(null);

  // Default positions if none provided - these are example positions that can be adjusted
  const defaultPositions: TeardropPosition[] =
    teardropPositions.length > 0
      ? teardropPositions
      : [
          { id: 1, position: [-1, 0.5, -1] },
          { id: 2, position: [0, 0.5, -1] },
          { id: 3, position: [1, 0.5, -1] },
          { id: 4, position: [-1, 0.5, 0] },
          { id: 5, position: [0, 0.5, 0] },
          { id: 6, position: [1, 0.5, 0] },
          { id: 7, position: [-1, 0.5, 1] },
          { id: 8, position: [0, 0.5, 1] },
          { id: 9, position: [1, 0.5, 1] },
        ];

  const handleTeardropClick = (id: number) => {
    setCurrentTeardrop(id);
    setModalOpen(true);
  };

  const handleBlueOut = (id: number) => {
    setSelectedTeardrops((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const getTeardropPricing = (id: number) => {
    const teardrop = defaultPositions.find((t) => t.id === id);
    return {
      minimumSpendPerSeat: teardrop?.minimumSpendPerSeat ?? minimumSpendPerSeat,
      reservationFee: teardrop?.reservationFee ?? reservationFee,
    };
  };

  return (
    <div
      className={`overflow-hidden relative ${className} `}
      style={{ width, height }}
    >
      <Canvas
        camera={{ position: [0, 8, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <directionalLight position={[-5, -5, -5]} intensity={0.6} />

        <Grid
          args={[10, 10]}
          cellColor="#6f6f6f"
          sectionColor="#9d4b4b"
          fadeDistance={25}
          fadeStrength={1}
        />
        <Suspense fallback={null}>
          <GlbModel url={url} onLoad={() => setLoading(false)} />
        </Suspense>
        {defaultPositions.map(({ id, position }) => (
          <TeardropMarker
            key={id}
            position={position}
            number={id}
            isSelected={selectedTeardrops.has(id)}
            onClick={() => handleTeardropClick(id)}
          />
        ))}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={0.5}
          maxDistance={50}
        />
      </Canvas>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-lg">Loading 3D Model...</div>
        </div>
      )}
      {currentTeardrop !== null && (
        <TeardropModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          teardropNumber={currentTeardrop}
          onBlueOut={() => handleBlueOut(currentTeardrop)}
          isSelected={selectedTeardrops.has(currentTeardrop)}
          minimumSpendPerSeat={
            getTeardropPricing(currentTeardrop).minimumSpendPerSeat
          }
          reservationFee={getTeardropPricing(currentTeardrop).reservationFee}
          vipPositions={vipPositions}
        />
      )}
    </div>
  );
};

export default GlbViewer;
