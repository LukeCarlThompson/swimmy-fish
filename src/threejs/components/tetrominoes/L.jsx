import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { Shadow } from '@react-three/drei';

const Block = props => (
  <a.mesh
    {...props}
    scale={[1, 1, 1]}
    // onClick={event => setActive(!active)}
    // onPointerOver={event => setHover(true)}
    // onPointerOut={event => setHover(false)}
  >
    <boxGeometry args={[0.99, 0.99, 0.99]} />
    <a.meshStandardMaterial color="red" />
  </a.mesh>
);

const L = props => {
  const ref = useRef();

  // useFrame((state, delta) => {
  //   const { position } = ref.current;
  //   if (position.y <= -3) {
  //     position.y = 3;
  //   } else {
  //     position.y -= 0.01;
  //   }
  //   // ref.current.position.y -= 0.01
  // });

  return (
    <group {...props}>
      <Block position={[0, 0, 0]} />
      <Block position={[0, 1, 0]} />
      <Block position={[0, 2, 0]} />
      <Block position={[1, 0, 0]} />
    </group>
  );
};

export default L;
