import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { LiloMood } from '@/hooks/useLiloUX.ts';

interface Lilo3DCharacterProps {
  mood: LiloMood;
  scale?: number;
  position?: [number, number, number];
  isIdle?: boolean;
}

const Lilo3DCharacter: React.FC<Lilo3DCharacterProps> = ({ 
  mood, 
  scale = 1, 
  position = [0, 0, 0],
  isIdle = false 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Mesh>(null);
  const antennaLightRef = useRef<THREE.Mesh>(null);

  // Animation states based on mood
  const moodConfig = useMemo(() => {
    switch (mood) {
      case 'happy':
        return {
          bodyColor: '#8E44FF',
          eyeScale: 1.1,
          antennaGlow: 0.8,
          floatSpeed: 1,
          floatRange: 0.1
        };
      case 'excited':
        return {
          bodyColor: '#9B5DE5',
          eyeScale: 1.3,
          antennaGlow: 1.2,
          floatSpeed: 2,
          floatRange: 0.2
        };
      case 'thinking':
        return {
          bodyColor: '#6A5ACD',
          eyeScale: 0.9,
          antennaGlow: 0.5,
          floatSpeed: 0.5,
          floatRange: 0.05
        };
      case 'curious':
        return {
          bodyColor: '#40E0D0',
          eyeScale: 1.2,
          antennaGlow: 1.0,
          floatSpeed: 1.5,
          floatRange: 0.15
        };
      case 'dormant':
        return {
          bodyColor: '#708090',
          eyeScale: 0.7,
          antennaGlow: 0.2,
          floatSpeed: 0.3,
          floatRange: 0.03
        };
      case 'alert':
        return {
          bodyColor: '#FF6347',
          eyeScale: 1.4,
          antennaGlow: 1.5,
          floatSpeed: 3,
          floatRange: 0.25
        };
      default:
        return {
          bodyColor: '#8E44FF',
          eyeScale: 1,
          antennaGlow: 0.6,
          floatSpeed: 1,
          floatRange: 0.1
        };
    }
  }, [mood]);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(time * moodConfig.floatSpeed) * moodConfig.floatRange;
      
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    }

    if (bodyRef.current) {
      // Breathing effect
      const breathScale = 1 + Math.sin(time * 2) * 0.02;
      bodyRef.current.scale.setScalar(breathScale);
    }

    if (headRef.current) {
      // Head bobbing
      headRef.current.rotation.z = Math.sin(time * 1.5) * 0.05;
    }

    // Eye blinking animation
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.sin(time * 0.5) > 0.98 ? 0.1 : moodConfig.eyeScale;
      leftEyeRef.current.scale.setScalar(blink);
      rightEyeRef.current.scale.setScalar(blink);
    }

    // Antenna light pulsing
    if (antennaLightRef.current) {
      const lightMaterial = antennaLightRef.current.material as THREE.MeshStandardMaterial;
      lightMaterial.emissiveIntensity = moodConfig.antennaGlow + Math.sin(time * 3) * 0.3;
    }

    // Excited state: bounce effect
    if (mood === 'excited' && bodyRef.current) {
      bodyRef.current.position.y = Math.abs(Math.sin(time * 4)) * 0.1;
    }

    // Thinking state: side-to-side head movement
    if (mood === 'thinking' && headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.8) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Body - Main purple sphere */}
      <Sphere ref={bodyRef} args={[0.6, 32, 32]} position={[0, -0.2, 0]}>
        <meshStandardMaterial 
          color={moodConfig.bodyColor}
          roughness={0.1}
          metalness={0.1}
          emissive={moodConfig.bodyColor}
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Hair - Fluffy mauve hair on top */}
      <Sphere args={[0.35, 16, 16]} position={[0, 0.65, 0]}>
        <meshStandardMaterial 
          color="#B19CD9"
          roughness={0.8}
          metalness={0.0}
        />
      </Sphere>
      <Sphere args={[0.25, 16, 16]} position={[-0.15, 0.75, 0.1]}>
        <meshStandardMaterial 
          color="#B19CD9"
          roughness={0.8}
          metalness={0.0}
        />
      </Sphere>
      <Sphere args={[0.25, 16, 16]} position={[0.15, 0.75, 0.1]}>
        <meshStandardMaterial 
          color="#B19CD9"
          roughness={0.8}
          metalness={0.0}
        />
      </Sphere>
      <Sphere args={[0.2, 16, 16]} position={[0, 0.8, -0.15]}>
        <meshStandardMaterial 
          color="#B19CD9"
          roughness={0.8}
          metalness={0.0}
        />
      </Sphere>

      {/* Head - Slightly smaller sphere */}
      <Sphere ref={headRef} args={[0.45, 32, 32]} position={[0, 0.3, 0]}>
        <meshStandardMaterial 
          color={moodConfig.bodyColor}
          roughness={0.1}
          metalness={0.1}
          emissive={moodConfig.bodyColor}
          emissiveIntensity={0.15}
        />
      </Sphere>

      {/* Mouth - Changes based on mood */}
      <group position={[0, 0.18, 0.42]}>
        {mood === 'happy' || mood === 'excited' ? (
          // Happy mouth - smile (using curved Box for stability)
          <Box args={[0.15, 0.04, 0.02]} rotation={[0, 0, 0.3]}>
            <meshStandardMaterial 
              color="#FF69B4"
              emissive="#FF69B4"
              emissiveIntensity={0.3}
            />
          </Box>
        ) : mood === 'thinking' || mood === 'curious' ? (
          // Thinking mouth - small O
          <Sphere args={[0.04, 12, 12]}>
            <meshStandardMaterial 
              color="#8B4A8C"
              emissive="#8B4A8C"
              emissiveIntensity={0.2}
            />
          </Sphere>
        ) : mood === 'dormant' ? (
          // Sleeping mouth - line
          <Box args={[0.08, 0.02, 0.02]}>
            <meshStandardMaterial 
              color="#6A5ACD"
            />
          </Box>
        ) : mood === 'alert' ? (
          // Alert mouth - surprised O
          <Sphere args={[0.06, 12, 12]}>
            <meshStandardMaterial 
              color="#FF4444"
              emissive="#FF4444"
              emissiveIntensity={0.4}
            />
          </Sphere>
        ) : (
          // Default mouth - neutral
          <Box args={[0.06, 0.02, 0.02]}>
            <meshStandardMaterial 
              color="#8E44FF"
            />
          </Box>
        )}
      </group>

      {/* Left Eye */}
      <Sphere ref={leftEyeRef} args={[0.08, 16, 16]} position={[-0.12, 0.35, 0.35]}>
        <meshStandardMaterial 
          color="#000000"
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Right Eye */}
      <Sphere ref={rightEyeRef} args={[0.08, 16, 16]} position={[0.12, 0.35, 0.35]}>
        <meshStandardMaterial 
          color="#000000"
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Eye sparkles */}
      <Sphere args={[0.02, 8, 8]} position={[-0.1, 0.37, 0.42]}>
        <meshStandardMaterial 
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={1}
        />
      </Sphere>
      <Sphere args={[0.02, 8, 8]} position={[0.14, 0.37, 0.42]}>
        <meshStandardMaterial 
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={1}
        />
      </Sphere>

      {/* Antenna */}
      <Cylinder ref={antennaRef} args={[0.02, 0.02, 0.3]} position={[0, 0.7, 0]}>
        <meshStandardMaterial 
          color="#4A4A4A"
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>

      {/* Antenna Light */}
      <Sphere ref={antennaLightRef} args={[0.06, 16, 16]} position={[0, 0.9, 0]}>
        <meshStandardMaterial 
          color="#FDCB6E"
          emissive="#FDCB6E"
          emissiveIntensity={moodConfig.antennaGlow}
          roughness={0}
          metalness={0}
        />
      </Sphere>

      {/* Chest emblem area */}
      <Box args={[0.3, 0.2, 0.05]} position={[0, -0.1, 0.55]}>
        <meshStandardMaterial 
          color="#FF6B6B"
          roughness={0.3}
          metalness={0.1}
        />
      </Box>

      {/* Arms */}
      <Sphere args={[0.15, 16, 16]} position={[-0.5, 0, 0]}>
        <meshStandardMaterial 
          color={moodConfig.bodyColor}
          roughness={0.1}
          metalness={0.1}
        />
      </Sphere>
      <Sphere args={[0.15, 16, 16]} position={[0.5, 0, 0]}>
        <meshStandardMaterial 
          color={moodConfig.bodyColor}
          roughness={0.1}
          metalness={0.1}
        />
      </Sphere>

      {/* Bottom torus (floating ring) */}
      <Torus args={[0.4, 0.08, 16, 32]} position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#4A90E2"
          emissive="#4A90E2"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.3}
        />
      </Torus>

      {/* Decorative particles around the torus */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 0.5;
        const z = Math.sin(angle) * 0.5;
        return (
          <Sphere key={i} args={[0.03, 8, 8]} position={[x, -0.8, z]}>
            <meshStandardMaterial 
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.8}
            />
          </Sphere>
        );
      })}

      {/* Ambient light for the character */}
      <pointLight 
        position={[0, 1, 1]} 
        intensity={moodConfig.antennaGlow * 0.5} 
        color="#FDCB6E" 
        distance={3}
      />
    </group>
  );
};

export default Lilo3DCharacter;