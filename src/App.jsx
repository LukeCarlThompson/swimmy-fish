import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import styled from "styled-components";
// import { useSpring, a } from '@react-spring/three';
import { Sky, Stats, Environment, AdaptiveDpr, AdaptiveEvents, OrbitControls } from "@react-three/drei";
import * as MathUtils from "three/src/math/MathUtils.js";
import { PhysicsScene } from "./threejs/components/PhysicsScene";
import Controls from "./threejs/components/Controls";
import Lighting from "./threejs/components/Lighting";
import Effects from "./threejs/components/Effects";
import playerStore from "./stores/playerStore";
import worldStore from "./stores/worldStore";
import Particles from "./threejs/components/Particles";
import BackgroundMounds from "./threejs/components/BackgroundMounds";
import Seaweed from "./threejs/components/Seaweed";
import BackgroundImages from "./threejs/components/BackgroundImages";
import { PerformanceControl } from "./threejs/components/PerformanceControl";
// import envImgUrl from './images/blue-env.hdr';

const SceneStyles = styled.div`
  width: 100vw;
  height: 100vh;
  user-select: none;
`;

const CameraMovement = () => {
  useFrame((state, delta) => {
    const [x, y, z] = playerStore.position;
    const [velocityX, velocityY, velocityZ] = playerStore.velocity;

    const lerpedX = MathUtils.lerp(state.camera.position.x, x + velocityX * 0.1, 0.5);
    const limitedY = y + velocityY * 0.1 > 11 ? 11 : y + velocityY * 0.1 > -9 ? y + velocityY * 0.1 : -9;

    const lerpedYPosition = MathUtils.lerp(state.camera.position.y, limitedY, 0.5);

    const lerpedYLookAt = MathUtils.lerp(state.camera.position.y, y + velocityY * 0.1, 0.7);

    state.camera.lookAt(lerpedX, lerpedYLookAt, 0);

    state.camera.position.y = lerpedYPosition;
    state.camera.position.x = lerpedX;
    state.camera.position.z = 20;

    state.camera.updateProjectionMatrix();
  });
  return null;
};

const Fog = () => {
  const fogRef = useRef();
  const { waterHeight, fogColor } = worldStore;

  useFrame(({ camera }) => {
    if (camera.position.y > waterHeight) {
      fogRef.current.far = 1000;
    } else {
      fogRef.current.far = 200;
    }
  });

  return <fog ref={fogRef} attach="fog" args={[fogColor, 0, 200]} />;
};

const App = () => {
  return (
    <SceneStyles>
      <Canvas
        // frameloop="demand"
        performance={{
          min: 0.1,
          max: 1,
          debounce: 200,
        }}
        shadows
        mode="concurrent"
        camera={{
          position: [0, 0, 20],
          fov: 45,
          far: 230,
          near: 0.1,
        }}
      >
        {/* <OrbitControls enabled target={[0, -20, 0]} minDistance={20} maxDistance={200} /> */}
        <Sky azimuth={0} turbidity={3.5} rayleigh={2} inclination={1} sunPosition={[0.1, 5, -5]} distance={100} />
        <Fog />
        <color attach="background" args={[worldStore.fogColor]} />
        <Suspense fallback={null}>
          <Environment files="./blue-env-02.hdr" />
          <Lighting />
          <PhysicsScene />
          <BackgroundImages />
          <Seaweed number={1000} />
          <BackgroundMounds />
          <Particles count={500} />
        </Suspense>
        <CameraMovement />
        <Controls />
        {/* <Effects /> */}
        <PerformanceControl />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Stats
          showPanel={0} // Start-up panel (default=0)
          className="stats" // Optional className to add to the stats container dom element
          // All stats.js props are valid
        />
      </Canvas>
    </SceneStyles>
  );
};

export default App;
