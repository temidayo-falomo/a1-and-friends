"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

type TeardropMarkerProps = {
  position: [number, number, number];
  number: number;
  isSelected: boolean;
  onClick: () => void;
};

const TeardropMarker = ({
  position,
  number,
  isSelected,
  onClick,
}: TeardropMarkerProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const radius = 0.1;

  // Make circle face camera
  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  const color = isSelected ? "#f63b4b" : "#ffffff"; // Red when selected, white otherwise

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <circleGeometry args={[radius, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.08}
        color={isSelected ? "#ffffff" : "#000000"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/neue-helvetica/Helvetica Neue LT 53 Extended.ttf"
      >
        {number}
      </Text>
    </group>
  );
};

export default TeardropMarker;
