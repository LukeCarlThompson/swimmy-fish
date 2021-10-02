/* eslint-disable no-nested-ternary */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  createRef,
} from 'react';
// import { useSpring, a } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Physics,
  useBox,
  usePlane,
  useSpring,
  useSphere,
} from '@react-three/cannon';
import { Sphere, softShadows } from '@react-three/drei';
import playerStore from '../../stores/playerStore';
import { sigmoid, degToRad } from '../helpers';
import Player from './Player';
import Ball from './Ball';
import Background from './Background';

const Plane = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -10, 0],
    ...props,
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial shininess={30} color="#163f61" />
    </mesh>
  );
};

const Boundary = props => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 0, 0],
    linearDamping: 0.9,
    linearFactor: [1, 1, 0],
    args: [50, 50, 50],
    ...props,
  }));

  console.log('Boundary');
  return (
    <group ref={ref}>
      <Sphere position={[0, 0, 0]} args={[50, 50, 50]}>
        <meshStandardMaterial color="#615637" />
      </Sphere>
    </group>
  );
};

const Scene = props => {
  console.log('Scene');

  return (
    <>
      <Physics gravity={[0, 0, 0]} tolerance={0.1}>
        <Player color="#e07e28" />
        <Ball position={[5, 0, 0]} size={0.75} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[6, 2, 0]} size={0.2} />
        <Ball position={[6, 2, 0]} size={0.15} />
        <Ball position={[6, 2, 0]} size={0.35} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[-2, -5, 0]} />
        <Ball position={[-3, -3, 0]} size={1.2} />
        <Ball position={[-7, -5, 0]} size={0.8} />
        <Background />
        <Plane />
      </Physics>
    </>
  );
};

export default Scene;
