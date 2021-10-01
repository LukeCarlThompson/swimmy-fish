import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Tube } from '@react-three/drei';

const Material = props => (
  <meshLambertMaterial
    attach="material"
    flatShading={false}
    specular="#eff41c"
    color="green"
  />
);

const Pillar = props => {
  const randomRef = useRef(Math.random() + 0.5);

  console.log('Pillar');

  return (
    <mesh {...props} scale={1}>
      <coneGeometry args={[randomRef.current, randomRef.current * 100, 5]} />
      <Material />
    </mesh>
  );
};

const Background = props => {
  const coordsRef = useRef(
    Array.from(Array(20)).map(item => [
      Math.random() - 0.5,
      Math.random(),
      Math.random(),
    ])
  );
  // console.log('coordsRef -->', coordsRef);

  return (
    <group>
      {coordsRef.current.map((item, i) => {
        const positionX = item[0] * 100;
        const positionZ = item[1] * -100 + 10;
        const rotationY = item[2];

        return (
          <Pillar
            key={i}
            position={[positionX, 0, positionZ]}
            rotation={[0, rotationY, 0]}
          />
        );
      })}
    </group>
  );
};

export default Background;
