import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  color?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ count = 3000, color = "#8E44FF" }) => {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Color variation
      const colorObj = new THREE.Color(color);
      const hsl = { h: 0, s: 0, l: 0 };
      colorObj.getHSL(hsl);
      
      // Add slight variation
      hsl.h += (Math.random() - 0.5) * 0.1;
      hsl.l += (Math.random() - 0.5) * 0.3;
      
      colorObj.setHSL(hsl.h, hsl.s, Math.max(0.1, Math.min(1, hsl.l)));
      
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
    }
    
    return [positions, colors];
  }, [count, color]);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });
  
  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const FloatingParticles: React.FC<ParticleSystemProps> = (props) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ParticleSystem {...props} />
      </Canvas>
    </div>
  );
};

export default FloatingParticles;