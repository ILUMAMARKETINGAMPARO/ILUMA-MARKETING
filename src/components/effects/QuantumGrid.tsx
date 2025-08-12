import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const GridLines: React.FC = () => {
  const linesRef = useRef<THREE.Group>(null);
  
  const gridData = useMemo(() => {
    const lines = [];
    const gridSize = 20;
    const step = 1;
    
    // Horizontal lines
    for (let i = -gridSize; i <= gridSize; i += step) {
      lines.push({
        points: [
          new THREE.Vector3(-gridSize, 0, i),
          new THREE.Vector3(gridSize, 0, i)
        ],
        color: new THREE.Color(0x8E44FF)
      });
    }
    
    // Vertical lines
    for (let i = -gridSize; i <= gridSize; i += step) {
      lines.push({
        points: [
          new THREE.Vector3(i, 0, -gridSize),
          new THREE.Vector3(i, 0, gridSize)
        ],
        color: new THREE.Color(0x8E44FF)
      });
    }
    
    return lines;
  }, []);
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.002;
      linesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });
  
  return (
    <group ref={linesRef}>
      {gridData.map((line, index) => (
        <Line
          key={index}
          points={line.points}
          color={line.color}
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
};

const QuantumNodes: React.FC = () => {
  const nodesRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const nodeArray = [];
    for (let i = 0; i < 50; i++) {
      nodeArray.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 30
        ),
        color: Math.random() > 0.5 ? '#8E44FF' : '#FFD56B'
      });
    }
    return nodeArray;
  }, []);
  
  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, index) => {
        child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.01;
        child.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.2);
      });
    }
  });
  
  return (
    <group ref={nodesRef}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

const QuantumGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
      <Canvas
        camera={{ position: [0, 10, 20], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8E44FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFD56B" />
        
        <GridLines />
        <QuantumNodes />
      </Canvas>
    </div>
  );
};

export default QuantumGrid;