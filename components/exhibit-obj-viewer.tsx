"use client";

import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

type ObjModelProps = {
  url: string;
};

const ObjModel = ({ url }: ObjModelProps) => {
  const obj = useLoader(OBJLoader, url);
  return <primitive object={obj} />;
};

const ExhibitObjViewer = () => {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-black/60">
      <Canvas camera={{ position: [0, 1, 8], fov: 45 }}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[8, 12, 6]} intensity={1} />
        <Suspense fallback={null}>
          <ObjModel url="/3d-club-exhibit-mtl_2025-11-23_1543/3D Club - Exhibit.obj" />
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
};

export default ExhibitObjViewer;
