'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function BookModel({ unlocked = false, onClick }: { unlocked?: boolean, onClick?: () => void }) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Breathing animation
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      if (hovered) {
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(state.clock.elapsedTime) * 0.1, 0.1);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.1, 0.1);
      } else {
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0, 0.1);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.1);
      }
    }
  });

  return (
    <group 
      ref={group} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Book Cover */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 4, 0.4]} />
          <meshStandardMaterial color="#111111" roughness={0.7} metalness={0.1} />
        </mesh>
        
        {/* Pages (side view) */}
        <mesh position={[0.05, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.95, 3.9, 0.35]} />
          <meshStandardMaterial color="#f6f3ee" roughness={0.9} />
        </mesh>

        {/* Gold accent line */}
        <mesh position={[-1.3, 0, 0.205]}>
          <planeGeometry args={[0.05, 4]} />
          <meshStandardMaterial color="#b8925e" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Wax Seal if locked */}
        {!unlocked && (
          <mesh position={[1, 0, 0.22]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
            <meshStandardMaterial color="#8B0000" roughness={0.5} metalness={0.2} />
          </mesh>
        )}
      </Float>
    </group>
  );
}

export default function Book3D({ unlocked = false, onClick }: { unlocked?: boolean, onClick?: () => void }) {
  return (
    <div className="w-full h-full min-h-[400px] cursor-pointer" style={{ zIndex: 10 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
        <spotLight position={[-5, 5, 5]} intensity={1} penumbra={1} />
        <Environment preset="studio" />
        <BookModel unlocked={unlocked} onClick={onClick} />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
