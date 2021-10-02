import React, { useRef } from 'react';
import { SpotLight } from '@react-three/drei';

const Lighting = () => {
  console.log('lighting');

  return (
    <>
      <ambientLight intensity={0.3} color="#bfefff" />
      <spotLight
        position={[0, 100, -200]}
        angle={0.2}
        intensity={5}
        distance={300}
        decay={1}
        penumbra={1}
        color="#fffb8a"
        castShadow
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
      <SpotLight
        penumbra={0.5}
        position={[50, 150, -50]}
        intensity={1}
        distance={200}
        angle={0.8}
        attenuation={200}
        anglePower={10}
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
