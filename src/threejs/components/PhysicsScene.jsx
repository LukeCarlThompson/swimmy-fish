/* eslint-disable no-nested-ternary */
import React from "react";
import { Physics, usePlane } from "@react-three/cannon";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import playerStore from "../../stores/playerStore";
import { degToRad } from "../helpers";
import Player from "./Player";
import Ball from "./Ball";
import imgUrl from "../../images/caustics-bw.png";
import worldStore from "../../stores/worldStore";
import textureUrl from "../../images/rock-surface-texture.png";
import normalMapUrl from "../../images/rock-surface-normalmap.png";

const WaterSurface = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / -2, 0, 0],
    position: [0, worldStore.waterHeight, -125],
    isTrigger: true,
    onCollide: (e) => {
      const { body, contact } = e;
      const playerUuid = playerStore.uuid;
      const playerApi = playerStore.cannonApi;
      const { velocity } = playerStore;
      if (body.uuid === playerUuid) {
        playerApi.applyImpulse([velocity[0] * 0.2, velocity[1] * 0.2, 0], [0, 0, 0]);
      }
    },
    ...props,
  }));

  const emissiveMap = useLoader(TextureLoader, imgUrl);
  // This positions the texture on the plane. Puts the bottom center at the middle of the plane;
  emissiveMap.offset.set(0, 1);
  emissiveMap.repeat.set(100, 30);

  useFrame(({ clock }) => {
    const { geometry } = ref.current;
    const { position } = geometry.attributes;

    const newPositions = position.array.map((item, i) => {
      // Long array of coordinates made of of x, y, z, for each vertex. Get the x coord from each triplet to modify and leave the rest alone.
      if ((i - 2) % 3 === 0) {
        return item + Math.sin((position.array[i + 1] * i || 0) + clock.getElapsedTime()) * 0.01;
      }
      return item;
    });

    position.array = newPositions;
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={ref} position={[0, worldStore.waterHeight, -100]}>
      <planeBufferGeometry attach="geometry" args={[800, 300, 10, 10]} />
      <meshPhongMaterial
        shininess={100}
        color="#587fad"
        emissive="#9aede5"
        emissiveMap={emissiveMap}
        emissiveIntensity={0.75}
        side={2}
      />
    </mesh>
  );
};

const UnderwaterBackground = (props) => (
  <mesh rotation={[degToRad(0), 0, 0]} position={[0, 0, -200]}>
    <planeBufferGeometry attach="geometry" args={[1000, 30]} />
    <meshBasicMaterial color="#e3f6ff" />
  </mesh>
);

const Floor = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -10, 0],
    ...props,
  }));

  const colorMap = useLoader(TextureLoader, textureUrl);
  const normalMap = useLoader(TextureLoader, normalMapUrl);

  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000, 50, 50]} />
      <meshPhongMaterial
        attach="material"
        color={worldStore.groundBaseColor}
        shininess={0}
        map={colorMap}
        displacementMap={normalMap}
        displacementScale={4}
        displacementBias={-2}
        normalMap={normalMap}
        normalScale={[1, 1]}
        roughnessMap={colorMap}
      />
    </mesh>
  );
};

const PhysicsScene = (props) => {
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
        <Player color="#e07e28" />
        <Ball position={[-3, -3, 0]} size={1.2} />
        <UnderwaterBackground />
        <Floor />
      </Physics>
    </>
  );
};

export { PhysicsScene };
