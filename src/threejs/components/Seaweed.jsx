import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sphere,
} from '@react-three/drei';
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

const Pillar = props => {
  const randomRef = useRef(Math.random() + 0.5);

  console.log('Pillar');

  return (
    <>
      <coneGeometry
        args={[randomRef.current * 0.5, randomRef.current * 60, 5]}
      />
      <Material opacity={1} color="#275e5c" />
    </>
  );
};

const Seaweed = props => {
  const coordsRef = useRef(
    Array.from(Array(200)).map(item => [
      Math.random() - 0.5,
      Math.random(),
      Math.random(),
    ])
  );
  const mesh = useRef();
  const dummy = useRef(new THREE.Object3D());
  const positions = useRef(
    coordsRef.current.map((item, i) => {
      const positionX = item[0] * 100;
      const positionZ = item[1] * -100 + 10;
      const rotationY = item[2];

      return { positionX, positionZ, rotationY };
    }),
    []
  );

  useLayoutEffect(() => {
    positions.current.forEach((item, i) => {
      const { positionX, positionZ, rotationY } = item;
      dummy.current.position.set(
        positionX,
        0,
        positionZ > -1 && positionZ < 2
          ? positionZ
          : positionZ - Math.random() * 100
      );
      dummy.current.rotation.set(0, rotationY, 0);
      dummy.current.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.current.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <instancedMesh
      ref={mesh}
      receiveShadow
      castShadow
      args={[null, null, positions.current.length]}
    >
      <Pillar />
    </instancedMesh>
  );
};

export default Seaweed;
