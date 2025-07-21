import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { LiloMood } from '@/types/lilo';

interface Lilo3DFullBodyProps {
  mood: LiloMood;
  scale?: number;
  position?: [number, number, number];
  isIdle?: boolean;
}

const Lilo3DFullBody: React.FC<Lilo3DFullBodyProps> = ({ 
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
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  // Configuration d'humeur
  const moodConfig = useMemo(() => {
    switch (mood) {
      case 'happy':
        return {
          bodyColor: '#8E44FF',
          eyeScale: 1.1,
          antennaGlow: 0.8,
          floatSpeed: 1,
          floatRange: 0.1,
          armAnimation: 0.2,
          legAnimation: 0.1
        };
      case 'excited':
        return {
          bodyColor: '#9B5DE5',
          eyeScale: 1.3,
          antennaGlow: 1.2,
          floatSpeed: 2,
          floatRange: 0.25,
          armAnimation: 0.4,
          legAnimation: 0.2
        };
      case 'thinking':
        return {
          bodyColor: '#6A5ACD',
          eyeScale: 0.9,
          antennaGlow: 0.5,
          floatSpeed: 0.5,
          floatRange: 0.05,
          armAnimation: 0.1,
          legAnimation: 0.05
        };
      case 'curious':
        return {
          bodyColor: '#40E0D0',
          eyeScale: 1.2,
          antennaGlow: 1.0,
          floatSpeed: 1.5,
          floatRange: 0.15,
          armAnimation: 0.3,
          legAnimation: 0.15
        };
      case 'dormant':
        return {
          bodyColor: '#708090',
          eyeScale: 0.7,
          antennaGlow: 0.2,
          floatSpeed: 0.3,
          floatRange: 0.03,
          armAnimation: 0.05,
          legAnimation: 0.02
        };
      case 'alert':
        return {
          bodyColor: '#FF6347',
          eyeScale: 1.4,
          antennaGlow: 1.5,
          floatSpeed: 3,
          floatRange: 0.3,
          armAnimation: 0.5,
          legAnimation: 0.25
        };
      default:
        return {
          bodyColor: '#8E44FF',
          eyeScale: 1,
          antennaGlow: 0.6,
          floatSpeed: 1,
          floatRange: 0.1,
          armAnimation: 0.2,
          legAnimation: 0.1
        };
    }
  }, [mood]);

  // Boucle d'animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Animation de flottement
      groupRef.current.position.y = position[1] + Math.sin(time * moodConfig.floatSpeed) * moodConfig.floatRange;
      
      // Rotation douce
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    }

    if (bodyRef.current) {
      // Effet de respiration
      const breathScale = 1 + Math.sin(time * 2) * 0.02;
      bodyRef.current.scale.setScalar(breathScale);
    }

    if (headRef.current) {
      // Balancement de tête
      headRef.current.rotation.z = Math.sin(time * 1.5) * 0.05;
      if (mood === 'thinking') {
        headRef.current.rotation.y = Math.sin(time * 0.8) * 0.15;
      }
    }

    // Animation des yeux
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.sin(time * 0.5) > 0.98 ? 0.1 : moodConfig.eyeScale;
      leftEyeRef.current.scale.setScalar(blink);
      rightEyeRef.current.scale.setScalar(blink);
    }

    // Pulsation de l'antenne
    if (antennaLightRef.current) {
      const lightMaterial = antennaLightRef.current.material as THREE.MeshStandardMaterial;
      lightMaterial.emissiveIntensity = moodConfig.antennaGlow + Math.sin(time * 3) * 0.3;
    }

    // Animation des bras
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 1.2) * moodConfig.armAnimation;
      rightArmRef.current.rotation.z = -Math.sin(time * 1.2) * moodConfig.armAnimation;
      
      if (mood === 'excited') {
        leftArmRef.current.rotation.x = Math.sin(time * 2) * 0.3;
        rightArmRef.current.rotation.x = Math.sin(time * 2 + Math.PI) * 0.3;
      }
    }

    // Animation des jambes
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(time * 1.5) * moodConfig.legAnimation;
      rightLegRef.current.rotation.x = -Math.sin(time * 1.5) * moodConfig.legAnimation;
    }

    // État excité : rebond
    if (mood === 'excited' && bodyRef.current) {
      bodyRef.current.position.y = Math.abs(Math.sin(time * 4)) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Corps principal */}
      <Sphere ref={bodyRef} args={[0.6, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={moodConfig.bodyColor}
          roughness={0.1}
          metalness={0.1}
          emissive={moodConfig.bodyColor}
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* T-shirt */}
      <Box args={[0.8, 0.6, 0.05]} position={[0, 0.1, 0.55]}>
        <meshStandardMaterial 
          color="#FF6B6B"
          roughness={0.3}
          metalness={0.1}
        />
      </Box>

      {/* Tête */}
      <Sphere ref={headRef} args={[0.45, 32, 32]} position={[0, 0.8, 0]}>
        <meshStandardMaterial 
          color={moodConfig.bodyColor}
          roughness={0.1}
          metalness={0.1}
          emissive={moodConfig.bodyColor}
          emissiveIntensity={0.15}
        />
      </Sphere>

      {/* Cheveux bouclés noir foncé */}
      <group position={[0, 1.1, 0]}>
        {/* Base des cheveux */}
        <Sphere args={[0.35, 16, 16]} position={[0, 0.1, 0]}>
          <meshStandardMaterial 
            color="#2D3748"
            roughness={0.9}
            metalness={0.0}
          />
        </Sphere>
        
        {/* Boucles individuelles */}
        <Sphere args={[0.12, 12, 12]} position={[-0.15, 0.15, 0.1]}>
          <meshStandardMaterial color="#1A202C" roughness={0.9} />
        </Sphere>
        <Sphere args={[0.1, 12, 12]} position={[0.1, 0.2, 0.15]}>
          <meshStandardMaterial color="#000000" roughness={0.9} />
        </Sphere>
        <Sphere args={[0.11, 12, 12]} position={[0.15, 0.1, -0.1]}>
          <meshStandardMaterial color="#2D3748" roughness={0.9} />
        </Sphere>
        <Sphere args={[0.08, 12, 12]} position={[-0.1, 0.25, -0.05]}>
          <meshStandardMaterial color="#1A202C" roughness={0.9} />
        </Sphere>
        <Sphere args={[0.09, 12, 12]} position={[0, 0.22, 0.2]}>
          <meshStandardMaterial color="#000000" roughness={0.9} />
        </Sphere>
      </group>

      {/* Yeux */}
      <Sphere ref={leftEyeRef} args={[0.08, 16, 16]} position={[-0.12, 0.85, 0.35]}>
        <meshStandardMaterial 
          color="#000000"
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </Sphere>
      <Sphere ref={rightEyeRef} args={[0.08, 16, 16]} position={[0.12, 0.85, 0.35]}>
        <meshStandardMaterial 
          color="#000000"
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Oreilles */}
      <group position={[-0.35, 0.8, 0]}>
        <Sphere args={[0.08, 16, 16]} rotation={[0, 0, -Math.PI / 6]}>
          <meshStandardMaterial color={moodConfig.bodyColor} roughness={0.1} metalness={0.1} />
        </Sphere>
        <Sphere args={[0.05, 12, 12]} position={[0.02, 0, 0.02]}>
          <meshStandardMaterial color="#C3A8F0" roughness={0.2} metalness={0.0} />
        </Sphere>
      </group>
      <group position={[0.35, 0.8, 0]}>
        <Sphere args={[0.08, 16, 16]} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial color={moodConfig.bodyColor} roughness={0.1} metalness={0.1} />
        </Sphere>
        <Sphere args={[0.05, 12, 12]} position={[-0.02, 0, 0.02]}>
          <meshStandardMaterial color="#C3A8F0" roughness={0.2} metalness={0.0} />
        </Sphere>
      </group>

      {/* Nez 3D plus visible */}
      <group position={[0, 0.75, 0.4]}>
        <Sphere args={[0.04, 12, 12]}>
          <meshStandardMaterial 
            color="#9F7AEA"
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={0.9}
          />
        </Sphere>
        <Sphere args={[0.015, 8, 8]} position={[-0.02, -0.015, 0.025]}>
          <meshStandardMaterial color="#E2E8F0" roughness={0.2} />
        </Sphere>
        <Sphere args={[0.015, 8, 8]} position={[0.02, -0.015, 0.025]}>
          <meshStandardMaterial color="#E2E8F0" roughness={0.2} />
        </Sphere>
      </group>

      {/* Reflets des yeux */}
      <Sphere args={[0.02, 8, 8]} position={[-0.1, 0.87, 0.42]}>
        <meshStandardMaterial 
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={1}
        />
      </Sphere>
      <Sphere args={[0.02, 8, 8]} position={[0.14, 0.87, 0.42]}>
        <meshStandardMaterial 
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={1}
        />
      </Sphere>

      {/* Bouche améliorée */}
      <group position={[0, 0.68, 0.42]}>
        {mood === 'happy' || mood === 'excited' ? (
          <>
            <Box args={[0.15, 0.04, 0.02]} rotation={[0, 0, 0.3]}>
              <meshStandardMaterial 
                color="#FF69B4"
                emissive="#FF69B4"
                emissiveIntensity={0.3}
              />
            </Box>
            {/* Langue pour les expressions heureuses */}
            <Sphere args={[0.02, 8, 8]} position={[0.05, -0.02, 0.01]}>
              <meshStandardMaterial 
                color="#E53E3E"
                roughness={0.6}
              />
            </Sphere>
          </>
        ) : mood === 'thinking' || mood === 'curious' ? (
          <Sphere args={[0.04, 12, 12]}>
            <meshStandardMaterial 
              color="#8B4A8C"
              emissive="#8B4A8C"
              emissiveIntensity={0.2}
            />
          </Sphere>
        ) : (
          <Box args={[0.06, 0.02, 0.02]}>
            <meshStandardMaterial color="#8E44FF" />
          </Box>
        )}
      </group>

      {/* Antenne */}
      <Cylinder ref={antennaRef} args={[0.02, 0.02, 0.4]} position={[0, 1.4, 0]}>
        <meshStandardMaterial 
          color="#4A4A4A"
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>

      {/* Lumière d'antenne */}
      <Sphere ref={antennaLightRef} args={[0.06, 16, 16]} position={[0, 1.65, 0]}>
        <meshStandardMaterial 
          color="#FDCB6E"
          emissive="#FDCB6E"
          emissiveIntensity={moodConfig.antennaGlow}
          roughness={0}
          metalness={0}
        />
      </Sphere>

      {/* Bras gauche */}
      <group ref={leftArmRef} position={[-0.5, 0.3, 0]}>
        <Cylinder args={[0.08, 0.06, 0.4]} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial color={moodConfig.bodyColor} roughness={0.1} metalness={0.1} />
        </Cylinder>
        <Sphere args={[0.1, 16, 16]} position={[-0.15, -0.25, 0]}>
          <meshStandardMaterial color={moodConfig.bodyColor} roughness={0.1} metalness={0.1} />
        </Sphere>
      </group>

      {/* Bras droit */}
      <group ref={rightArmRef} position={[0.5, 0.3, 0]}>
        <Cylinder args={[0.08, 0.06, 0.4]} rotation={[0, 0, -Math.PI / 6]}>
          <meshStandardMaterial color={moodConfig.bodyColor} roughness={0.1} metalness={0.1} />
        </Cylinder>
        <Sphere args={[0.1, 16, 16]} position={[0.15, -0.25, 0]}>
          <meshStandardMaterial color={moodConfig.bodyColor} roughness={0.1} metalness={0.1} />
        </Sphere>
      </group>

      {/* Jambe gauche */}
      <group ref={leftLegRef} position={[-0.2, -0.8, 0]}>
        <Cylinder args={[0.1, 0.08, 0.5]}>
          <meshStandardMaterial color={moodConfig.bodyColor} roughness={0.1} metalness={0.1} />
        </Cylinder>
        <Sphere args={[0.12, 16, 16]} position={[0, -0.35, 0]}>
          <meshStandardMaterial color={moodConfig.bodyColor} roughness={0.1} metalness={0.1} />
        </Sphere>
      </group>

      {/* Jambe droite */}
      <group ref={rightLegRef} position={[0.2, -0.8, 0]}>
        <Cylinder args={[0.1, 0.08, 0.5]}>
          <meshStandardMaterial color={moodConfig.bodyColor} roughness={0.1} metalness={0.1} />
        </Cylinder>
        <Sphere args={[0.12, 16, 16]} position={[0, -0.35, 0]}>
          <meshStandardMaterial color={moodConfig.bodyColor} roughness={0.1} metalness={0.1} />
        </Sphere>
      </group>

      {/* Anneau flottant */}
      <Torus args={[0.5, 0.08, 16, 32]} position={[0, -1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#4A90E2"
          emissive="#4A90E2"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.3}
        />
      </Torus>

      {/* Particules décoratives */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.6;
        const z = Math.sin(angle) * 0.6;
        return (
          <Sphere key={i} args={[0.03, 8, 8]} position={[x, -1.3, z]}>
            <meshStandardMaterial 
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.8}
            />
          </Sphere>
        );
      })}

      {/* Éclairage ambiant */}
      <pointLight 
        position={[0, 1, 1]} 
        intensity={moodConfig.antennaGlow * 0.5} 
        color="#FDCB6E" 
        distance={4}
      />
    </group>
  );
};

export default Lilo3DFullBody;