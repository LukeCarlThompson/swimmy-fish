import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

const Sphere = props => {
  console.log('Sphere');

  return (
    <>
      <sphereGeometry args={(Math.random() * 0.5 + 0.75) * 8} />
      <meshLambertMaterial attach="material" color="#275e5c" />
    </>
  );
};

const Background = props => {
  const mesh = useRef();
  const coordsRef = useRef(
    Array.from(Array(20)).map(item => [
      Math.random() - 0.5,
      Math.random(),
      Math.random(),
    ])
  );
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
      const randomHeight = Math.random() * 0.5 + 0.5;
      dummy.current.position.set(
        positionX * (Math.random() + 0.5),
        -15,
        positionZ * (Math.random() + 0.75)
      );
      dummy.current.scale.set(1, randomHeight, 1);
      dummy.current.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.current.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <instancedMesh ref={mesh} args={[null, null, positions.current.length]}>
      <Sphere />
    </instancedMesh>
  );
};

export default Background;
