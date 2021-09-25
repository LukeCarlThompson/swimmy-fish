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

  // const velocityRef = useRef([0, 0, 0]);

  console.log('Ball');

  // useFrame(state => {

  //   api.velocity.subscribe(v => (velocityRef.current = v));

  //   const [x, y, z] = velocityRef.current;

  //   const wobble = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;

  //   api.velocity.set(x, y + wobble, 0);
  // });

  return (
    <group ref={ref}>
      <Sphere position={[0, 0, 0]} args={[size]}>
        <BodyMaterial translate={[0, 0, 0]} attach="material" color="pink" />
      </Sphere>
    </group>
  );
};

export default Ball;
