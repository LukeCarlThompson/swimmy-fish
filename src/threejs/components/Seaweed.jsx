import React, { useRef, useMemo, Suspense, useLayoutEffect } from 'react';
import { useFrame, useThree, Canvas, useLoader } from '@react-three/fiber';
import { Object3D } from 'three/src/core/Object3D.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
import worldStore from '../../stores/worldStore';
import imgUrl from '../../images/seaweed-100w.png';

const Plane = props => {
  console.log('Plane');
  const colorMap = useLoader(TextureLoader, imgUrl);
  // This positions the txture on the plane. Puts the bottom center at the middle of the plane;
  colorMap.offset.set(0, -1);
  colorMap.repeat.set(1, 2);

  return (
    <>
      <planeGeometry args={[3, 12]} />
      <meshLambertMaterial
        attach="material"
        color={worldStore.groundBaseColor}
        transparent
        alphaTest={0.5}
        // opacity={1}
        map={colorMap}
        // alphaMap={colorMap}
        // normalMap={colorMap}
        // roughnessMap={colorMap}
        // aoMap={colorMap}
      />
    </>
  );
};

const Pillar = props => {
  console.log('Pillar');
  return (
    <>
      <coneGeometry args={[0.5, 15, 7]} />
      <meshLambertMaterial
        attach="material"
        color={worldStore.groundBaseColor}
      />
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
  const dummy = useRef(new Object3D());
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
      const randomHeight = Math.random() * 2;
      item.position = [
        positionX,
        // randomHeight * 8 * 0.5 + -10,
        -10,
        positionZ > -1 && positionZ < 2
          ? positionZ
          : positionZ - Math.random() * 100,
      ];

      dummy.current.position.set(...item.position);

      item.scale = [randomHeight, randomHeight, 1];
      dummy.current.scale.set(...item.scale);
      dummy.current.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.current.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { sin } = Math;

  useFrame(state => {
    positions.current.forEach((item, i) => {
      const motion =
        sin(state.clock.elapsedTime + item.position[0] * 0.03) * 0.1;
      dummy.current.scale.set(...item.scale);
      dummy.current.position.set(...item.position);
      dummy.current.rotation.set(motion * 1, motion * -2, motion);
      dummy.current.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.current.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, positions.current.length]}>
      <Plane />
    </instancedMesh>
  );
};

export default Seaweed;
