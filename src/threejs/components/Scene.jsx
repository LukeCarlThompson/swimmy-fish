/* eslint-disable no-nested-ternary */
import React from 'react';
// import { useSpring, a } from '@react-spring/three';
// import { useFrame, useThree } from '@react-three/fiber';
import { Physics, usePlane } from '@react-three/cannon';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useFrame, useLoader } from '@react-three/fiber';
import playerStore from '../../stores/playerStore';
import { degToRad } from '../helpers';
import Player from './Player';
import Ball from './Ball';
import BackgroundMounds from './BackgroundMounds';
import imgUrl from '../../images/caustics-bw.png';
import Seaweed from './Seaweed';
import BackgroundImages from './BackgroundImages';
import worldStore from '../../stores/worldStore';
import textureUrl from '../../images/rock-surface-texture.png';
import normalMapUrl from '../../images/rock-surface-normalmap.png';

const WaterSurface = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, worldStore.waterHeight, 0],
    isTrigger: true,
    onCollide: e => {
      const { body } = e;
      const playerUuid = playerStore.uuid;
      if (body.uuid === playerUuid) {
        playerStore.isUnderWater = true;
        // console.log('player entered water', e);
      }
    },
    ...props,
  }));
  console.log('Water surface');
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshBasicMaterial
        attach="material"
        color="#303d75"
        transparent
        opacity={0.25}
      />
    </mesh>
  );
};

const Ceiling = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / -2, 0, 0],
    position: [0, worldStore.waterHeight, -125],
    isTrigger: true,
    onCollide: e => {
      const { body, contact } = e;
      const playerUuid = playerStore.uuid;
      const playerApi = playerStore.cannonApi;
      const { velocity } = playerStore;
      if (body.uuid === playerUuid) {
        playerStore.isUnderWater = false;
        playerApi.applyImpulse(
          [velocity[0] * 0.2, velocity[1] * 0.2, 0],
          [0, 0, 0]
        );
        // console.log('player left water', e);
      }
    },
    ...props,
  }));

  const emissiveMap = useLoader(TextureLoader, imgUrl);
  // This positions the txture on the plane. Puts the bottom center at the middle of the plane;
  emissiveMap.offset.set(0, 1);
  emissiveMap.repeat.set(100, 30);
  console.log('emissiveMap -->', emissiveMap);

  useFrame(({ clock }) => {
    const { geometry } = ref.current;
    const { position } = geometry.attributes;

    const newPositions = position.array.map((item, i) => {
      // Long array of coordinates made of of x, y, z, for each vertex. Get the x coord from each triplet to modify and leave the rest alone.
      if ((i - 2) % 3 === 0) {
        return (
          item +
          Math.sin((position.array[i + 1] * i || 0) + clock.getElapsedTime()) *
            0.01
        );
      }
      return item;
    });

    position.array = newPositions;
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  console.log('Ceiling');
  return (
    <mesh ref={ref} position={[0, worldStore.waterHeight, -100]}>
      <planeBufferGeometry attach="geometry" args={[800, 300, 10, 30]} />
      <meshPhongMaterial
        shininess={100}
        color="#587fad"
        emissive="#9aede5"
        emissiveMap={emissiveMap}
        emissiveIntensity={0.75}
        side={2}
      />
      {/* <meshPhysicalMaterial
        attach="material"
        specular="white"
        roughness={0.3}
        reflectivity={1}
        metalness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.15}
        color={worldStore.groundBaseColor}
        side={2}
        emissive="#9aede5"
        emissiveMap={emissiveMap}
        emissiveIntensity={1}
      /> */}
    </mesh>
  );
};

const UnderwaterBackground = props => (
  <mesh rotation={[degToRad(0), 0, 0]} position={[0, 0, -200]}>
    <planeBufferGeometry attach="geometry" args={[1000, 30]} />
    <meshBasicMaterial color="#e3f6ff" />
  </mesh>
);

const Floor = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -10, 0],
    ...props,
  }));

  const colorMap = useLoader(TextureLoader, textureUrl);
  const normalMap = useLoader(TextureLoader, normalMapUrl);

  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000, 400, 400]} />
      <meshPhongMaterial
        attach="material"
        color={worldStore.groundBaseColor}
        shininess={0}
        map={colorMap}
        displacementMap={normalMap}
        displacementScale={4}
        displacementBias={-2}
        normalMap={normalMap}
        normalScale={[0.2, 0.2]}
        roughnessMap={colorMap}
      />
    </mesh>
  );
};

const Scene = props => {
  console.log('Scene');

  return (
    <>
      <Physics
        gravity={[0, 0, 0]}
        broadphase="SAP"
        defaultContactMaterial={{
          contactEquationRelaxation: 4,
          friction: 1e-3,
        }}
        allowSleep
      >
        <WaterSurface />
        <Ceiling />
        <Player color="#e07e28" />
        <Ball position={[5, 0, 0]} size={0.75} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[6, 2, 0]} size={0.2} />
        <Ball position={[6, 2, 0]} size={0.15} />
        <Ball position={[6, 2, 0]} size={0.35} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[-2, -5, 0]} />
        <Ball position={[-3, -3, 0]} size={1.2} />
        <Ball position={[-7, -5, 0]} size={0.8} />
        <BackgroundMounds />
        <Seaweed />
        <BackgroundImages />
        <UnderwaterBackground />
        <Floor />
      </Physics>
    </>
  );
};

export default Scene;
