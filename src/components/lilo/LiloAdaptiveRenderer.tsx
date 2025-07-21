import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LiloFullBodyCharacter from './LiloFullBodyCharacter';
import Lilo3DFullBody from './Lilo3DFullBody';
import { LiloMood } from '@/types/lilo';

interface LiloAdaptiveRendererProps {
  mood: LiloMood;
  scale?: number;
  isIdle?: boolean;
  force3D?: boolean;
  compact?: boolean;
  className?: string;
}

const LiloAdaptiveRenderer: React.FC<LiloAdaptiveRendererProps> = ({
  mood,
  scale = 1,
  isIdle = false,
  force3D = false,
  compact = false,
  className = ""
}) => {
  const [use3D, setUse3D] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Détection des capacités du device
    const checkPerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setIsLowPerformance(true);
        return;
      }

      // Test de performance simple
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
      
      setIsLowPerformance(isMobile || hasLowMemory);
    };

    checkPerformance();
    
    // Décider d'utiliser la 3D
    setUse3D(force3D && !isLowPerformance && !compact);
  }, [force3D, compact, isLowPerformance]);

  if (use3D) {
    return (
      <div className={`w-full h-full ${className}`}>
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} intensity={0.8} />
          <Lilo3DFullBody 
            mood={mood}
            scale={scale}
            isIdle={isIdle}
          />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={isIdle}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <LiloFullBodyCharacter 
        mood={mood}
        scale={compact ? scale * 0.6 : scale}
        isIdle={isIdle}
      />
    </div>
  );
};

export default LiloAdaptiveRenderer;