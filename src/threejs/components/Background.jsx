import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Tube } from '@react-three/drei';
import * as THREE from 'three';

const Material = props => (
  // <meshPhongMaterial
  //   attach="material"
  //   flatShading={false}
  //   specular="#eff41c"
  //   color={props.color || 'green'}
  //   transparent
  //   opacity={props.opacity || 0.5}
  // />
  <meshPhysicalMaterial
    attach="material"
    flatShading={false}
    specular="#eff41c"
    rougness={0.7}
    reflectivity={1}
    metalness={1}
    clearcoat={1}
    clearcoatRoughness={0.2}
    transparent
    opacity={props.opacity || 0.5}
    color={props.color || 'green'}
  />
);

const Block = props => {
  const randomRef = useRef(Math.random() * 10);

  console.log('Pillar');

  return (
    <>
      <group>
        <mesh {...props} scale={1} receiveShadow castShadow>
          <icosahedronGeometry args={randomRef.current} />
          <Material opacity={1} color="#163f61" />
        </mesh>
      </group>
    </>
  );
};

const Pillar = props => {
  const randomRef = useRef(Math.random() + 0.5);

  console.log('Pillar');

  return (
    <>
      <group>
        <mesh {...props} scale={1} receiveShadow castShadow>
          <coneGeometry
            args={[randomRef.current * 0.8, randomRef.current * 100, 5]}
          />
          <Material opacity={1} color="#275e5c" />
        </mesh>
        <mesh {...props} scale={1}>
          <coneGeometry
            args={[randomRef.current, randomRef.current * 100, 5]}
          />
          <Material color="#3e8045" opacity={0.25} />
        </mesh>
      </group>
    </>
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
          <group key={i}>
            <Block
              position={[
                positionX * (Math.random() + 0.5),
                -10,
                positionZ * (Math.random() + 0.75),
              ]}
              rotation={[rotationY, rotationY, 0]}
            />
            <Pillar
              position={[positionX, 0, positionZ]}
              rotation={[0, rotationY, 0]}
            />
          </group>
        );
      })}
    </group>
  );
};

export default Background;
