import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import styled from 'styled-components';
import { useSpring, a } from '@react-spring/three';
import { OrbitControls, Sky, Plane, Sphere, Stage } from '@react-three/drei';
import Scene from './threejs/components/Scene';
import Effects from './threejs/components/Effects';
import playerStore from './stores/playerStore';

const SceneStyles = styled.div`
  width: 100vw;
  height: 100vh;
`;

const CameraMovement = () => {
  useFrame(state => {
    state.camera.position.y = playerStore.getState().position[1];
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
          position: [4.5, -10, 50],
          fov: 35,
          far: 300,
          near: 0.1,
        }}
      >
        {/* <OrbitControls
          enabled
          target={[5, -10, 0]}
          minDistance={20}
          maxDistance={60}
        /> */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Scene />
        <Sky
          azimuth={0.1}
          turbidity={5}
          rayleigh={0}
          inclination={0.6}
          sunPosition={[0.1, 0, -5]}
          distance={10000}
        />
        {/* <Sphere scale={500} position={[4.5, -519, -10]}>
          <meshPhongMaterial attach="material" color="#2f313d" />
        </Sphere> */}
        <CameraMovement />
        {/* <Effects /> */}
      </Canvas>
    </SceneStyles>
  );
};

export default App;
