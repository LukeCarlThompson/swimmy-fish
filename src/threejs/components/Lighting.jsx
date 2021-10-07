import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as MathUtils from 'three/src/math/MathUtils.js';
import playerStore from '../../stores/playerStore';

const Lighting = () => {
  console.log('lighting');
  const ambientLightRef = useRef();

  useFrame(() => {
    const { isUnderWater } = playerStore;

    ambientLightRef.current.intensity = MathUtils.lerp(
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
        angle={0.3}
        intensity={10}
        distance={500}
        decay={3}
        penumbra={1}
        color="white"
      />
    </>
  );
};

export default Lighting;
