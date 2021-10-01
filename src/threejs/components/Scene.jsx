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
import { Sphere } from '@react-three/drei';
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
      <shadowMaterial attach="material" color="#163f61" />
      <meshLambertMaterial color="#163f61" acc />
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

const FishBowl = props => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [7, 3, 0],
    linearDamping: 0.9,
    linearFactor: [1, 1, 0],
    args: 3,
    ...props,
  }));

  const materialProps = {
    transparent: true,
    thickness: { value: 5, min: 0, max: 20 },
    roughness: { value: 1, min: 0, max: 1, step: 0.1 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
    ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
    envMapIntensity: { value: 25, min: 0, max: 100, step: 1 },
    color: '#ffffff',
    attenuationTint: '#ffe79e',
    attenuationDistance: { value: 0, min: 0, max: 1 },
  };

  return (
    <group ref={ref}>
      <Sphere position={[0, 0, 0]} args={[3]}>
        <meshPhysicalMaterial {...materialProps} />
        {/* <meshPhongMaterial
          attach="material"
          flatShading={false}
          specular="#eff41c"
          color={props.color || 'purple'}
          translate={[0, 0, 0]}
        /> */}
      </Sphere>
    </group>
  );
};

const Scene = props => {
  console.log('Scene');

  return (
    <>
      <Physics gravity={[0, 0, 0]} tolerance={0.1}>
        <Player color="#eb7a17" />
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
