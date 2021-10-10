import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as MathUtils from 'three/src/math/MathUtils.js';
import playerStore from '../../stores/playerStore';
import { Color } from 'three/src/math/Color.js';

// console.log('Color -->', Color);

const Lighting = () => {
  console.log('lighting');
  const ambientLightRef = useRef();
  const spotLightRef = useRef();
  const colorRef = useRef(new Color());
  // console.log('Color -->', Color);

  useFrame(() => {
    const { isUnderWater } = playerStore;

    ambientLightRef.current.intensity = MathUtils.lerp(
      ambientLightRef.current.intensity,
      isUnderWater ? 0.1 : 0.5,
      0.1
    );

    ambientLightRef.current.color.lerp(isUnderWater ? colorRef.current.set('#ffffff') : colorRef.current.set('#ffdb4a'), 0.1);

    // SPot light adjustments
    // spotLightRef.current.color.lerp(isUnderWater ? colorRef.current.set('#ffffff') : colorRef.current.set('#ffdb4a'), 0.1);
    // spotLightRef.current.intensity = MathUtils.lerp(
    //   ambientLightRef.current.intensity,
    //   isUnderWater ? 10 : 1000,
    //   0.5
    // );
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.1} color="white" />
      <spotLight
        ref={spotLightRef}
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
