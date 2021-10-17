import React, { useRef, useLayoutEffect } from 'react';
import { Object3D } from 'three/src/core/Object3D.js';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import worldStore from '../../stores/worldStore';

import textureUrl from '../../images/rock-surface-texture.png';
import normalMapUrl from '../../images/rock-surface-normalmap.png';

const Sphere = props => {
  console.log('Sphere');

  const colorMap = useLoader(TextureLoader, textureUrl);
  const normalMap = useLoader(TextureLoader, normalMapUrl);

  return (
    <>
      <sphereGeometry args={(Math.random() * 0.5 + 0.75) * 6} />
      {/* <meshLambertMaterial
        attach="material"
        color={worldStore.groundBaseColor}
      /> */}
      <meshPhongMaterial
        attach="material"
        color={worldStore.groundBaseColor}
        shininess={0}
        map={colorMap}
        displacementMap={normalMap}
        displacementScale={2}
        displacementBias={0}
        normalMap={normalMap}
        normalScale={[0.2, 0.2]}
        roughnessMap={colorMap}
      />
    </>
  );
};

const BackgroundMounds = props => {
  const mesh = useRef();
  const coordsRef = useRef(
    Array.from(Array(10)).map(item => [
      Math.random() - 0.5,
      Math.random(),
      Math.random(),
    ])
  );
  const dummy = useRef(new Object3D());
  const positions = useRef(
    coordsRef.current.map((item, i) => {
      const positionX = item[0] * 300;
      const positionZ = item[1] * -100 - 10;
      const rotationY = item[2];

      return { positionX, positionZ, rotationY };
    }),
    []
  );

  useLayoutEffect(() => {
    positions.current.forEach((item, i) => {
      const { positionX, positionZ, rotationY } = item;
      const randomHeight = Math.random() * 0.5 + 0.5;
      dummy.current.rotation.set(-1, 0, -0.5);
      dummy.current.position.set(
        positionX * (Math.random() + 0.5),
        -15 + Math.abs(positionX) * 0.05,
        positionZ
      );
      dummy.current.scale.set(
        1 + Math.abs(positionX) * 0.01,
        1 + Math.abs(positionX) * 0.01,
        1 + Math.abs(positionX) * 0.01
      );
      dummy.current.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.current.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group>
      <instancedMesh ref={mesh} args={[null, null, positions.current.length]}>
        <Sphere />
      </instancedMesh>
    </group>
  );
};

export default BackgroundMounds;
