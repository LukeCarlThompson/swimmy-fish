import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  createRef,
} from 'react';
// import { useSpring, a } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Plane, Sphere, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import playerStore from '../../stores/playerStore';
import { sigmoid, degToRad } from '../helpers';

const BodyMaterial = props => (
  <meshPhongMaterial
    attach="material"
    flatShading={false}
    specular="#eff41c"
    color={props.color || 'purple'}
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

  const sprerePositionRef = useRef(props.position);

  console.log('Ball');

  useFrame(state => {
    // Lock it in position on the z-plane
    // api.position.subscribe(p => (sprerePositionRef.current = p));
    // api.position.set(
    //   sprerePositionRef.current[0],
    //   sprerePositionRef.current[1],
    //   0
    // );
  });

  return (
    <group ref={ref}>
      <Sphere position={[0, 0, 0]} args={[size]}>
        <BodyMaterial translate={[0, 0, 0]} attach="material" color="pink" />
      </Sphere>
    </group>
  );
};

export default Ball;
