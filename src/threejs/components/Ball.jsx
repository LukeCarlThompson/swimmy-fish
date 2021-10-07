import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Color } from 'three/src/math/Color.js';

const Ball = props => {
  const material = useRef();
  const isTouchedRef = useRef(false);
  const initialColorRef = useRef(new Color('hsl(340, 88%, 45%)'));
  const touchedColorRef = useRef(new Color('hsl(220, 87%, 30%)'));

  const size = props.size || 0.5;

  const [ref, api] = useSphere(() => ({
    mass: size * 0.2,
    position: props.position,
    linearDamping: 0.7,
    linearFactor: [1, 1, 0],
    args: size,
    allowSleep: true,
    sleepSpeedLimit: 0.25,
    onCollide: e => {
      isTouchedRef.current = !isTouchedRef.current;
    },
    ...props,
  }));

  useFrame(({ clock }) => {
    // const sin = Math.abs(Math.sin(clock.getElapsedTime())) * 0.5 + 0.5;

    if (isTouchedRef.current) {
      material.current.color.lerpHSL(touchedColorRef.current, 0.05);
      // material.current.distort = 1;
    } else {
      material.current.color.lerpHSL(initialColorRef.current, 0.05);
      // material.current.distort = 0.5;
    }
  });

  console.log('Ball');

  return (
    <group ref={ref}>
      <Sphere position={[0, 0, 0]} args={[size]} receiveShadow castShadow>
        {/* <meshLambertMaterial ref={material} attach="material" color="#275e5c" /> */}
        <MeshDistortMaterial
          ref={material}
          attach="material"
          color={`hsl(${340}, ${88}%, ${60}%)`}
          // transparent
          // opacity={0.8}
          metalness={1}
          specular="#0068b3"
          roughness={0.7}
          reflectivity={0.5}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
        />
      </Sphere>
    </group>
  );
};

export default Ball;
