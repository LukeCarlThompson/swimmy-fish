import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import styled from 'styled-components';
import { useSpring, a } from '@react-spring/three';
import { OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';
import Scene from './threejs/components/Scene';
import Effects from './threejs/components/Effects';
import playerStore from './stores/playerStore';
import Grass from './threejs/components/Grass';
import { sigmoid, degToRad } from './threejs/helpers';

const SceneStyles = styled.div`
  width: 100vw;
  height: 100vh;
  user-select: none;
`;

const CameraMovement = () => {
  // const vec3 = new THREE.Vector3();
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
        <ambientLight intensity={0.75} />
        <pointLight position={[0, 100, -20]} />
        <Scene />
        <Sky
          azimuth={0}
          turbidity={5}
          rayleigh={0}
          inclination={0.8}
          sunPosition={[0.1, 10, -5]}
          distance={10000}
        />
        <fog attach="fog" args={['#547f91', 10, 200]} />
        {/* <Suspense fallback={null}>
          <Grass />
        </Suspense> */}
        <CameraMovement />
        {/* <Effects /> */}
      </Canvas>
    </SceneStyles>
  );
};

export default App;
