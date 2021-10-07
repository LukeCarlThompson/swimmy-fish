/* eslint-disable no-nested-ternary */
import React from 'react';
// import { useSpring, a } from '@react-spring/three';
// import { useFrame, useThree } from '@react-three/fiber';
import { Physics, usePlane } from '@react-three/cannon';
import playerStore from '../../stores/playerStore';
import { degToRad } from '../helpers';
import Player from './Player';
import Ball from './Ball';
import BackgroundMounds from './BackgroundMounds';
import Seaweed from './Seaweed';
import worldStore from '../../stores/worldStore';

const WaterSurface = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 10, 0],
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
      <meshBasicMaterial attach="material" transparent opacity={0} />
    </mesh>
  );
};

const Ceiling = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / -2, 0, 0],
    position: [0, 10, -125],
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
  console.log('Ceiling');
  return (
    <mesh ref={ref} position={[0, 10, -100]}>
      <planeBufferGeometry attach="geometry" args={[1000, 300]} />
      {/* <meshPhongMaterial
        shininess={100}
        color="#356375"
        side={2}
      /> */}
      <meshPhysicalMaterial
        attach="material"
        specular="white"
        roughness={0.3}
        reflectivity={1}
        metalness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.15}
        color={worldStore.groundBaseColor}
        side={2}
      />
    </mesh>
  );
};

const UnderwaterBackground = props => (
  <mesh rotation={[degToRad(0), 0, 0]} position={[0, 0, -200]}>
    <planeBufferGeometry attach="geometry" args={[1000, 20]} />
    <meshBasicMaterial color="#356375" />
  </mesh>
);

const Floor = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -10, 0],
    ...props,
  }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshLambertMaterial
        attach="material"
        color={worldStore.groundBaseColor}
      />
    </mesh>
  );
};

// const Boundary = props => {
//   const [ref, api] = useSphere(() => ({
//     mass: 1,
//     position: [0, 0, 0],
//     linearDamping: 0.9,
//     linearFactor: [1, 1, 0],
//     args: [50, 50, 50],
//     ...props,
//   }));

//   console.log('Boundary');
//   return (
//     <group ref={ref}>
//       <Sphere position={[0, 0, 0]} args={[50, 50, 50]}>
//         <meshStandardMaterial color="#615637" />
//       </Sphere>
//     </group>
//   );
// };

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
        <UnderwaterBackground />
        <Floor />
      </Physics>
    </>
  );
};

export default Scene;
