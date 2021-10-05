import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import worldStore from '../../stores/worldStore';

const Sphere = props => {
  console.log('Sphere');

  return (
    <>
      <sphereGeometry args={(Math.random() * 0.5 + 0.75) * 8} />
      <meshLambertMaterial
        attach="material"
        color={worldStore.groundBaseColor}
      />
    </>
  );
};

const BackgroundMounds = props => {
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
    <group>
      <instancedMesh ref={mesh} args={[null, null, positions.current.length]}>
        <Sphere />
      </instancedMesh>
      <mesh position={[-30, -13, -100]} rotation={[0, 0, 0]}>
        <icosahedronGeometry args={25} />
        <meshLambertMaterial
          attach="material"
          color={worldStore.groundBaseColor}
        />
      </mesh>
      <mesh
        position={[-40, -15, -40]}
        rotation={[Math.random() * 10, Math.random() * 10, Math.random() * 10]}
      >
        <icosahedronGeometry args={15} />
        <meshLambertMaterial
          attach="material"
          color={worldStore.groundBaseColor}
        />
      </mesh>
      <mesh
        position={[10, -10, -10]}
        rotation={[Math.random() * 10, Math.random() * 10, Math.random() * 10]}
      >
        <icosahedronGeometry args={5} />
        <meshLambertMaterial
          attach="material"
          color={worldStore.groundBaseColor}
        />
      </mesh>
      <mesh
        position={[20, -10, -25]}
        rotation={[Math.random() * 10, Math.random() * 10, Math.random() * 10]}
      >
        <dodecahedronGeometry args={5} />
        <meshLambertMaterial
          attach="material"
          color={worldStore.groundBaseColor}
        />
      </mesh>
    </group>
  );
};

export default BackgroundMounds;
