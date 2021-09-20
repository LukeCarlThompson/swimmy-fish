import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import styled from 'styled-components';
import { useSpring, a } from '@react-spring/three';
import { OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';
import Scene from './threejs/components/Scene';
import Effects from './threejs/components/Effects';
import playerStore from './stores/playerStore';

const SceneStyles = styled.div`
  width: 100vw;
  height: 100vh;
`;

const CameraMovement = () => {
  const vec3 = new THREE.Vector3();
  console.log('Camera movement');

  useFrame(state => {
    const [x, y, z] = playerStore.getState().position;
    // state.camera.position.y = y;
    const lerpOutput = vec3.lerp(vec3.set(x, y, z), 0.05);
    state.camera.lookAt(lerpOutput);
    // state.camera.lookAt(vec3.set(x, y, z));
    // state.camera.position.y = y;
    // state.camera.position.x = x;
    // state.camera.position.z = 50;
    // sigmoid(THREE.MathUtils.lerp(state.camera.position.y, y, 0.5)) * 20;
    // THREE.MathUtils.lerp(state.camera.position.y, y, 1);

    // console.log(
    //   'camera lerp result -->',
    //   (sigmoid(THREE.MathUtils.lerp(0, y, 0.5)) + 0) * 20
    // );

    // console.log('state camera y -->', state.camera.position.y);

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
        <OrbitControls
          enabled
          target={[0, -20, 0]}
          minDistance={20}
          maxDistance={60}
        />
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
        {/* <fog attach="fog" args={['#547f91', 30, 200]} /> */}
        <CameraMovement />
        {/* <Effects /> */}
      </Canvas>
    </SceneStyles>
  );
};

export default App;
