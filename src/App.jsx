import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import styled from 'styled-components';
import { useSpring, a } from '@react-spring/three';
import { OrbitControls, Sky, Stats } from '@react-three/drei';
import * as THREE from 'three';
import Scene from './threejs/components/Scene';
import Controls from './threejs/components/Controls';
import Lighting from './threejs/components/Lighting';
import Effects from './threejs/components/Effects';
import playerStore from './stores/playerStore';
import Particles from './threejs/components/Particles';

const SceneStyles = styled.div`
  width: 100vw;
  height: 100vh;
  user-select: none;
`;

const CameraMovement = () => {
  console.log('Camera movement');

  useFrame(state => {
    const [x, y, z] = playerStore.getState().position;
    const [velocityX, velocityY, velocityZ] = playerStore.getState().velocity;

    const lerpedX = x + velocityX * 0.1;
    const lerpedY = y + velocityY * 0.1;

    state.camera.lookAt(lerpedX, lerpedY * 0.65, 0);

    state.camera.position.y = lerpedY * 0.25;
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
        shadows
        colorManagement
        camera={{
          position: [0, 0, 20],
          fov: 45,
          far: 300,
          near: 0.1,
        }}
      >
        {/* <OrbitControls
          enabled
          target={[0, -20, 0]}
          minDistance={20}
          maxDistance={60}
        /> */}
        <Lighting />
        <Scene />
        {/* <Sky
          azimuth={0}
          turbidity={5}
          rayleigh={0}
          inclination={0.8}
          sunPosition={[0.1, 10, -5]}
          distance={10000}
        /> */}
        <Particles count={1000} mouse={{ current: [0, 0] }} />
        <fog attach="fog" args={['#a9e7ff', 0, 200]} />
        <color attach="background" args="#a9e7ff" />
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
