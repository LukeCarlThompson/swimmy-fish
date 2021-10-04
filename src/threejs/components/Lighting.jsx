import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import playerStore from '../../stores/playerStore';

const Lighting = () => {
  console.log('lighting');
  const ambientLightRef = useRef();

  useFrame(() => {
    const { isUnderWater } = playerStore.getState();

    ambientLightRef.current.intensity = THREE.MathUtils.lerp(
      ambientLightRef.current.intensity,
      isUnderWater ? 0.1 : 2,
      0.1
    );
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.1} color="white" />
      <spotLight
        position={[0, 200, -300]}
        angle={0.2}
        intensity={2}
        distance={700}
        decay={3}
        penumbra={1}
        color="#fffb8a"
      />
      {/* <pointLight
        position={[0, 1000, -1000]}
        decay={0}
        color="#fffb8a"
        intensity={1}
        castShadow
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      /> */}
    </>
  );
};

export default Lighting;
