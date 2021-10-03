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
import * as THREE from 'three';
import playerStore from '../../stores/playerStore';
import { sigmoid, degToRad } from '../helpers';
import Player from './Player';
import Ball from './Ball';
import Background from './Background';
import Seaweed from './Seaweed';

const Ceiling = props => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
    <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
    {/* <meshPhongMaterial shininess={100} color="#356375" /> */}
    <meshPhysicalMaterial
      attach="material"
      flatShading={false}
      specular="#9afcec"
      roughness={0.2}
      reflectivity={1}
      metalness={0.5}
      clearcoat={1}
      clearcoatRoughness={0.15}
      color="#87e5ff"
      side={THREE.DoubleSide}
    />
  </mesh>
);

const UnderwaterBackground = props => (
  <mesh rotation={[degToRad(0), 0, 0]} position={[0, 0, -200]}>
    <planeBufferGeometry attach="geometry" args={[1000, 20]} />
    <meshPhongMaterial shininess={100} color="#356375" />
  </mesh>
);

const Floor = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -10, 0],
    ...props,
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial shininess={10} color="#0f2a40" />
      {/* <meshPhysicalMaterial
        attach="material"
        flatShading={false}
        specular="#163f61"
        roughness={1}
        reflectivity={0.5}
        metalness={0}
        clearcoat={0}
        color="#051a17"
      /> */}
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
      <Ceiling />
      <Physics
        gravity={[0, 0, 0]}
        iterations={20}
        defaultContactMaterial={{
          friction: 0.9,
          restitution: 0.7,
          contactEquationStiffness: 1e7,
          contactEquationRelaxation: 1,
          frictionEquationStiffness: 1e7,
          frictionEquationRelaxation: 2,
        }}
        tolerance={0.001}
      >
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
        <Seaweed />
        <UnderwaterBackground />
        <Floor />
      </Physics>
    </>
  );
};

export default Scene;
