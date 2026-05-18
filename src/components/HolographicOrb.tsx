import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import WebGLBoundary from './WebGLBoundary';

const NEON = '#64ffda';
const PURPLE = '#9d4edd';

const Ring: React.FC<{ radius: number; tube: number; rotation: [number, number, number]; color: string; speed: number }> = ({
  radius,
  tube,
  rotation,
  color,
  speed,
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = rotation[0] + Math.sin(t * speed) * 0.3;
    ref.current.rotation.y = rotation[1] + t * speed * 0.5;
    ref.current.rotation.z = rotation[2] + t * speed * 0.3;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        toneMapped={false}
      />
    </mesh>
  );
};

const Core: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial
          color={NEON}
          emissive={NEON}
          emissiveIntensity={0.6}
          distort={0.45}
          speed={2.2}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const OrbitingDots: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const dots = useMemo(() => {
    const count = 24;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        angle,
        radius: 1.8 + Math.random() * 0.3,
        size: 0.04 + Math.random() * 0.05,
        y: (Math.random() - 0.5) * 0.4,
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {dots.map((d, i) => (
        <mesh key={i} position={[Math.cos(d.angle) * d.radius, d.y, Math.sin(d.angle) * d.radius]}>
          <sphereGeometry args={[d.size, 12, 12]} />
          <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={2} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
};

const OrbScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color={NEON} />
      <pointLight position={[-5, -3, -3]} intensity={1} color={PURPLE} />

      <Core />
      <Ring radius={1.5} tube={0.025} rotation={[Math.PI / 2, 0, 0]} color={NEON} speed={0.6} />
      <Ring radius={1.7} tube={0.02} rotation={[Math.PI / 3, Math.PI / 4, 0]} color={PURPLE} speed={0.4} />
      <Ring radius={1.95} tube={0.018} rotation={[0, Math.PI / 6, Math.PI / 3]} color="#7aa2f7" speed={0.3} />

      <OrbitingDots />

      <Sparkles count={80} scale={[5, 5, 5]} size={3} speed={0.6} color={NEON} />
    </>
  );
};

const OrbFallback: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative w-3/4 h-3/4">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/40 to-purple-500/30 blur-2xl animate-pulse-slow" />
      <div className="absolute inset-[15%] rounded-full border-2 border-neon-cyan/50 animate-spin-slow" />
      <div className="absolute inset-[25%] rounded-full border-2 border-purple-400/50 animate-spin-slow-reverse" />
      <div className="absolute inset-[35%] rounded-full bg-neon-cyan/30 backdrop-blur-md animate-pulse-slow" />
    </div>
  </div>
);

const HolographicOrb: React.FC = () => {
  return (
    <div className="w-full h-full">
      <WebGLBoundary fallback={<OrbFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }}
        >
          <OrbScene />
        </Canvas>
      </WebGLBoundary>
    </div>
  );
};

export default HolographicOrb;
