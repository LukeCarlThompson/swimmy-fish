import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Tube } from '@react-three/drei';
import * as THREE from 'three';

const Material = props => <meshPhongMaterial shininess={10} color="#0f2a40" />;

const Block = props => {
  console.log('Block');

  return (
    <>
      <group>
        <mesh {...props} scale={1} receiveShadow castShadow>
          <sphereGeometry args={(Math.random() * 0.5 + 0.75) * 8} />
          <Material />
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
                -15,
                positionZ * (Math.random() + 0.75),
              ]}
              rotation={[rotationY, rotationY, 0]}
            />
          </group>
        );
      })}
    </group>
  );
};

export default Background;
