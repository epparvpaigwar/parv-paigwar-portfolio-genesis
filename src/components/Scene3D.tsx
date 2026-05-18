import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Icosahedron, Octahedron, TorusKnot, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import WebGLBoundary from './WebGLBoundary';

const NEON = '#64ffda';
const PURPLE = '#8892b0';
const DEEP = '#0a192f';

interface FloatingShapeProps {
  position: [number, number, number];
  shape: 'ico' | 'octa' | 'torus';
  color: string;
  scale?: number;
  speed?: number;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({ position, shape, color, scale = 1, speed = 1 }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.2;
  });

  const Shape = shape === 'ico' ? Icosahedron : shape === 'octa' ? Octahedron : TorusKnot;
  const args: [number, number] | [number, number, number, number] =
    shape === 'torus' ? [0.5, 0.18, 100, 16] : [0.7, 0];

  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
      <Shape ref={ref} args={args} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          wireframe
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.75}
        />
      </Shape>
    </Float>
  );
};

const ParticleField: React.FC = () => {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 800;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={NEON} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const SceneContent: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const cameraTargetY = useRef(0);

  useFrame((state) => {
    // Mouse parallax
    const { mouse } = state;
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.25,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.15,
        0.04
      );
    }

    // Scroll-driven camera Y shift
    const scrollMax = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    const scrollProgress = window.scrollY / scrollMax;
    cameraTargetY.current = -scrollProgress * 4;
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      cameraTargetY.current,
      0.05
    );
    state.camera.position.z = 6 + Math.sin(scrollProgress * Math.PI) * 1.5;
    state.camera.lookAt(0, state.camera.position.y, 0);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color={NEON} />
      <pointLight position={[-10, -5, -5]} intensity={0.8} color={PURPLE} />

      <Stars radius={60} depth={40} count={3000} factor={3} fade speed={1} />
      <ParticleField />

      <group ref={groupRef}>
        <FloatingShape position={[-4, 2, -2]} shape="ico" color={NEON} scale={1.1} speed={0.6} />
        <FloatingShape position={[4, -1.5, -3]} shape="torus" color={NEON} scale={1.3} speed={0.4} />
        <FloatingShape position={[3, 3, -5]} shape="octa" color="#9d4edd" scale={0.9} speed={0.7} />
        <FloatingShape position={[-3, -3, -4]} shape="ico" color="#7aa2f7" scale={0.8} speed={0.5} />
        <FloatingShape position={[0, -6, -6]} shape="torus" color={NEON} scale={1.0} speed={0.3} />
        <FloatingShape position={[5, -8, -3]} shape="octa" color={NEON} scale={1.2} speed={0.5} />
        <FloatingShape position={[-5, -10, -4]} shape="ico" color="#9d4edd" scale={1.0} speed={0.4} />
        <FloatingShape position={[2, -13, -5]} shape="torus" color="#7aa2f7" scale={0.9} speed={0.6} />

        {/* Distorted glowing core, far back */}
        <mesh position={[0, 0, -10]}>
          <sphereGeometry args={[3, 64, 64]} />
          <MeshDistortMaterial
            color={DEEP}
            emissive={NEON}
            emissiveIntensity={0.15}
            distort={0.5}
            speed={1.5}
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </>
  );
};

const Fallback: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/10 blur-3xl animate-pulse-slow" />
    <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full bg-purple-500/10 blur-3xl animate-pulse-slow" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-blue-500/5 blur-3xl" />
  </div>
);

const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <WebGLBoundary fallback={<Fallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }}
        >
          <SceneContent />
        </Canvas>
      </WebGLBoundary>
    </div>
  );
};

export default Scene3D;
