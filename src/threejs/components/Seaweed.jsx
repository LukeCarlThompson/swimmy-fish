import React, { useRef, useMemo, Suspense, useLayoutEffect } from 'react';
import {
  useFrame,
  useThree,
  Canvas,
  useLoader,
  extend,
} from '@react-three/fiber';
import { Object3D } from 'three/src/core/Object3D.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import worldStore from '../../stores/worldStore';
import imgUrl from '../../images/seaweed-02.png';
import imgUrlWide from '../../images/seaweed-03.png';

const SeaweedWide = props => {
  const colorMap = useLoader(TextureLoader, imgUrlWide);
  // This positions the texture on the plane. Puts the bottom center at the middle of the plane;
  colorMap.offset.set(0, -1);
  colorMap.repeat.set(1, 2);

  const coordsRef = useRef(
    Array.from(Array(1000)).map(item => [
      Math.random() - 0.5,
      Math.random(),
      Math.random() * 0.5,
    ])
  );
  const mesh = useRef();
  const dummy = useRef(new Object3D());
  const positions = useRef(
    coordsRef.current.map((item, i) => {
      const positionX = item[0] * 200;
      const positionZ = item[1] * -180 + 10;
      const rotationY = item[2];

      return { positionX, positionZ, rotationY };
    }),
    []
  );

  useLayoutEffect(() => {
    positions.current.forEach((item, i) => {
      const { positionX, positionZ, rotationY } = item;
      const randomHeight = Math.random() * Math.random() * 2 + 0.2;
      item.position = [
        positionX,
        // randomHeight * 8 * 0.5 + -10,
        -10,
        // positionZ > -1 && positionZ < 2
        //   ? positionZ
        //   : positionZ - Math.sin(i) * 100,
        positionZ - Math.sin(i) * 100,
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
      <planeGeometry args={[6, 6]} />
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
    </instancedMesh>
  );
};

const Plane = props => {
  console.log('Plane');
  const colorMap = useLoader(TextureLoader, imgUrl);
  // This positions the texture on the plane. Puts the bottom center at the middle of the plane;
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

const SeaweedTall = props => {
  const coordsRef = useRef(
    Array.from(Array(500)).map((item, i) => [
      Math.sin(i) - 0.5,
      Math.random(),
      Math.random(),
    ])
  );
  const mesh = useRef();
  const dummy = useRef(new Object3D());
  const positions = useRef(
    coordsRef.current.map((item, i) => {
      const positionX = item[0] * 200;
      const positionZ = item[1] * -180 + 10;
      const rotationY = item[2];

      return { positionX, positionZ, rotationY };
    }),
    []
  );

  useLayoutEffect(() => {
    positions.current.forEach((item, i) => {
      const { positionX, positionZ, rotationY } = item;
      const randomHeight = Math.random() * Math.random() * 2 + 0.2;
      item.position = [
        // Math.sin(i) * 100,
        positionX,
        // randomHeight * 8 * 0.5 + -10,
        -10,
        // positionZ > -1 && positionZ < 2
        //   ? positionZ
        //   : positionZ - Math.random() * 100,
        positionZ - Math.sin(i) * 100,
      ];

      dummy.current.position.set(...item.position);

      item.scale = [randomHeight, randomHeight + (Math.random() - 0.5), 1];
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

const Seaweed = () => {
  console.log('seaweed');

  return (
    <>
      <SeaweedTall />
      <SeaweedWide />
    </>
  );
};

export default Seaweed;
