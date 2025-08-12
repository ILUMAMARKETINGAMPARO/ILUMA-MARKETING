import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, RoundedBox, Text3D, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Card3DProps {
  title: string;
  color: string;
  isHovered: boolean;
  children: React.ReactNode;
  className?: string;
}

const FloatingCard3D: React.FC<{ color: string; isHovered: boolean }> = ({ color, isHovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.7) * 0.05;
      
      if (isHovered) {
        meshRef.current.scale.setScalar(1.05);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <RoundedBox 
        ref={meshRef}
        args={[3, 4, 0.2]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.3}
          distort={isHovered ? 0.3 : 0.1}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </RoundedBox>
    </Float>
  );
};

const InteractiveCard3D: React.FC<Card3DProps> = ({ 
  title, 
  color, 
  isHovered, 
  children, 
  className 
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <FloatingCard3D color={color} isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* 2D Content Overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default InteractiveCard3D;