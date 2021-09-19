import { useSpring, a } from '@react-spring/three';
import React, { useState, useRef, useEffect } from 'react';
import { useBox, usePlane } from '@react-three/cannon';

const Plane = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [4.5, -20.5, 1],
    ...props,
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      <shadowMaterial attach="material" color="#171717" />
      <meshStandardMaterial color="#4bb3fd" />
    </mesh>
  );
};

const Back = props => (
  <mesh {...props} position={[4.5, -9.5, -1]} scale={[1, 1, 1]}>
    <boxGeometry args={[10, 20, 1]} />
    <meshStandardMaterial color="#4bb3fd" />
  </mesh>
);

const Bottom = props => {
  const [ref] = useBox(() => ({ mass: 1, position: [4.5, -20, 1], ...props }));
  return (
    <mesh ref={ref} {...props} scale={[1, 1, 1]}>
      <boxBufferGeometry attach="geometry" args={[10, 1, 5]} />
      <meshStandardMaterial color="#00487c" />
    </mesh>
  );
};

const Right = props => {
  const [ref] = useBox(() => ({ mass: 1, ...props }));

  return (
    <mesh {...props} ref={ref} position={[10, -10, 1]} scale={[1, 1, 1]}>
      <boxGeometry args={[1, 21, 5]} />
      <meshStandardMaterial color="#00487c" />
    </mesh>
  );
};

const Left = props => (
  <mesh {...props} position={[-1, -10, 1]} scale={[1, 1, 1]}>
    <boxGeometry args={[1, 21, 5]} />
    <meshStandardMaterial color="#00487c" />
  </mesh>
);

const TetrisGrid = props => (
  <>
    <Back />
    <Left />
    <Right />
    <Bottom />
    <Plane />
  </>
);
export default TetrisGrid;
