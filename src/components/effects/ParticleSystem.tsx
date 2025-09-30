'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';
import { ParticleSystemProps } from '@/types';

interface ParticleFieldProps {
  count: number;
  mouseMagnetic: boolean;
  mouseX: number;
  mouseY: number;
  size: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ 
  count, 
  mouseMagnetic, 
  mouseX, 
  mouseY,
  size 
}) => {
  const mesh = useRef<THREE.Points>(null);
  
  // Generate random particle positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position particles in 3D space
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      // Purple-blue gradient colors
      const colorVariation = Math.random();
      colors[i3] = 0.4 + colorVariation * 0.4;     // Red component
      colors[i3 + 1] = 0.1 + colorVariation * 0.6; // Green component
      colors[i3 + 2] = 0.8 + colorVariation * 0.2; // Blue component
    }
    
    return [positions, colors];
  }, [count]);

  // Store original positions for mouse interaction
  const originalPositions = useRef(new Float32Array(positions));
  
  useEffect(() => {
    originalPositions.current = new Float32Array(positions);
  }, [positions]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionArray = mesh.current.geometry.attributes.position.array as Float32Array;
    
    // Convert mouse position to 3D coordinates
    const mouse3D = new THREE.Vector3(
      typeof window !== 'undefined' ? (mouseX / window.innerWidth) * 2 - 1 : 0,
      typeof window !== 'undefined' ? -(mouseY / window.innerHeight) * 2 + 1 : 0,
      0
    );
    mouse3D.unproject(state.camera);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Get original position
      const originalX = originalPositions.current[i3];
      const originalY = originalPositions.current[i3 + 1];
      const originalZ = originalPositions.current[i3 + 2];
      
      // Apply floating animation
      const floatX = Math.sin(time * 0.5 + i * 0.1) * 0.2;
      const floatY = Math.cos(time * 0.3 + i * 0.1) * 0.2;
      const floatZ = Math.sin(time * 0.4 + i * 0.05) * 0.1;
      
      // Base animated position
      let newX = originalX + floatX;
      let newY = originalY + floatY;
      let newZ = originalZ + floatZ;
      
      // Mouse magnetic effect
      if (mouseMagnetic) {
        const particlePos = new THREE.Vector3(newX, newY, newZ);
        const distance = particlePos.distanceTo(mouse3D);
        const maxDistance = 5;
        
        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.5;
          const direction = particlePos.clone().sub(mouse3D).normalize();
          
          newX += direction.x * force;
          newY += direction.y * force;
          newZ += direction.z * force;
        }
      }
      
      positionArray[i3] = newX;
      positionArray[i3 + 1] = newY;
      positionArray[i3 + 2] = newZ;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the entire particle system slowly
    mesh.current.rotation.x = time * 0.05;
    mesh.current.rotation.y = time * 0.02;
  });

  return (
      <Points ref={mesh} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        size={size}
        sizeAttenuation
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 1000,
  color = '#8B5CF6',
  size = 0.05,
  speed = 1,
  mouseMagnetic = true,
}) => {
  const mousePosition = useMousePosition();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 75,
          near: 0.1,
          far: 1000 
        }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%' 
        }}
      >
        <Float
          speed={speed}
          rotationIntensity={0.2}
          floatIntensity={0.5}
          floatingRange={[-0.1, 0.1]}
        >
          <ParticleField
            count={count}
            mouseMagnetic={mouseMagnetic}
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
            size={size}
          />
        </Float>
        
        {/* Ambient light for subtle illumination */}
        <ambientLight intensity={0.3} />
        
        {/* Point light that follows mouse */}
        <pointLight
          position={[
            typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth - 0.5) * 10 : 0,
            typeof window !== 'undefined' ? -(mousePosition.y / window.innerHeight - 0.5) * 10 : 0,
            2
          ]}
          intensity={0.5}
          distance={10}
          color={color}
        />
      </Canvas>
    </div>
  );
};

export default ParticleSystem;
