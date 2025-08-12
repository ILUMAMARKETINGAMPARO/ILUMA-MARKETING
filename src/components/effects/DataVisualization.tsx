import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface DataPoint {
  position: THREE.Vector3;
  value: number;
  label: string;
  color: string;
}

interface DataVisualizationProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  animated?: boolean;
}

const FloatingDataPoint: React.FC<{ 
  position: THREE.Vector3; 
  value: number; 
  label: string; 
  color: string;
  index: number;
}> = ({ position, value, label, color, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + index) * 0.2;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <group position={position}>
        {/* Data sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[value * 0.1, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Label */}
        <Text
          position={[0, value * 0.15, 0]}
          fontSize={0.2}
          color="#FFD56B"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
        
        {/* Value */}
        <Text
          position={[0, -value * 0.15, 0]}
          fontSize={0.15}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          {value}%
        </Text>
      </group>
    </Float>
  );
};

const ConnectingLines: React.FC<{ points: DataPoint[] }> = ({ points }) => {
  const linesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((child, index) => {
        const material = (child as THREE.Line).material as THREE.LineBasicMaterial;
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime + index) * 0.2;
      });
    }
  });
  
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < points.length - 1; i++) {
      lines.push({
        points: [points[i].position, points[i + 1].position],
        color: points[i].color
      });
    }
    return lines;
  }, [points]);
  
  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => (
        <Line
          key={index}
          points={connection.points}
          color={connection.color}
          lineWidth={2}
          transparent
          opacity={0.5}
        />
      ))}
    </group>
  );
};

const DataVisualization3D: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8E44FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFD56B" />
      
      {data.map((point, index) => (
        <FloatingDataPoint
          key={index}
          position={point.position}
          value={point.value}
          label={point.label}
          color={point.color}
          index={index}
        />
      ))}
      
      <ConnectingLines points={data} />
    </>
  );
};

const DataVisualization: React.FC<DataVisualizationProps> = ({ 
  data, 
  animated = true 
}) => {
  const dataPoints = useMemo(() => {
    return data.map((item, index) => ({
      position: new THREE.Vector3(
        (index - data.length / 2) * 2,
        0,
        0
      ),
      value: item.value,
      label: item.label,
      color: item.color || '#8E44FF'
    }));
  }, [data]);
  
  if (!animated) {
    return null;
  }
  
  return (
    <div className="w-full h-64 pointer-events-none">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <DataVisualization3D data={dataPoints} />
      </Canvas>
    </div>
  );
};

export default DataVisualization;