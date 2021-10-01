import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Sphere } from '@react-three/drei';

const BodyMaterial = props => (
  <meshPhongMaterial
    attach="material"
    flatShading={false}
    specular="#80ffec"
    color={props.color || 'purple'}
    transparent
    opacity={props.opacity || 0.75}
  />
);

const Ball = props => {
  const size = props.size || 0.5;

  const [ref, api] = useSphere(() => ({
    mass: size * 0.2,
    position: props.position,
    linearDamping: 0.9,
    linearFactor: [1, 1, 0],
    args: size,
    ...props,
  }));

  console.log('Ball');

  return (
    <group ref={ref}>
      <Sphere position={[0, 0, 0]} args={[size]}>
        <BodyMaterial translate={[0, 0, 0]} attach="material" color="#0068b3" />
      </Sphere>
    </group>
  );
};

export default Ball;
