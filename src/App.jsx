import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import styled from 'styled-components';
// import { useSpring, a } from '@react-spring/three';
import { Sky, Stats, Environment } from '@react-three/drei';
import * as MathUtils from 'three/src/math/MathUtils.js';
import Scene from './threejs/components/Scene';
import Controls from './threejs/components/Controls';
import Lighting from './threejs/components/Lighting';
import Effects from './threejs/components/Effects';
import playerStore from './stores/playerStore';
import worldStore from './stores/worldStore';
import Particles from './threejs/components/Particles';
// import envImgUrl from './images/blue-env.hdr';

const SceneStyles = styled.div`
  width: 100vw;
  height: 100vh;
  user-select: none;
`;

const CameraMovement = () => {
  console.log('Camera movement');

  useFrame(state => {
    const [x, y, z] = playerStore.position;
    const [velocityX, velocityY, velocityZ] = playerStore.velocity;

    const lerpedX = MathUtils.lerp(
      state.camera.position.x,
      x + velocityX * 0.1,
      0.7
    );
    const limitedY =
      y + velocityY * 0.1 > 11
        ? 11
        : y + velocityY * 0.1 > -9
        ? y + velocityY * 0.1
        : -9;

    const lerpedYPosition = MathUtils.lerp(
      state.camera.position.y,
      limitedY,
      0.7
    );

    const lerpedYLookAt = MathUtils.lerp(
      state.camera.position.y,
      y + velocityY * 0.1,
      0.7
    );

    state.camera.lookAt(lerpedX, lerpedYLookAt, 0);

    state.camera.position.y = lerpedYPosition;
    state.camera.position.x = lerpedX;
    state.camera.position.z = 20;

    state.camera.updateProjectionMatrix();
  });
  return null;
};

const App = () => {
  console.log('Scene mounted');

  return (
    <SceneStyles>
      <Canvas
        // frameloop="demand"
        mode="concurrent"
        colorManagement
        camera={{
          position: [0, 0, 20],
          fov: 45,
          far: 230,
          near: 0.1,
        }}
      >
        {/* <OrbitControls
          enabled
          target={[0, -20, 0]}
          minDistance={20}
          maxDistance={60}
        /> */}
        <Suspense fallback={null}>
          {/* <Environment preset="forest" /> */}
          <Environment files={'/blue-env-02.hdr'} />
        </Suspense>
        <Suspense fallback={null}>
          <Lighting />
          <Scene />
          <Sky
            azimuth={0}
            turbidity={5}
            rayleigh={0}
            inclination={0.8}
            sunPosition={[0.1, 5, -5]}
            distance={10000}
          />
          <Particles count={1000} mouse={{ current: [0, 0] }} />
        </Suspense>
        <fog attach="fog" args={[worldStore.fogColor, 0, 200]} />
        {/* <color attach="background" args="#34d1a2" /> */}
        <CameraMovement />
        <Controls />
        {/* <Effects /> */}
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
