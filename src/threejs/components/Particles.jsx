import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import playerStore from '../../stores/playerStore';

export default function Particles({ count, mouse }) {
  const mesh = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 10 + Math.random();
      const speed = 0.01;
      const xFactor = -100 + Math.random() * 200;
      const yFactor = Math.random() * 12 - 10;
      const zFactor = -100 + Math.random() * 150;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame
  useFrame(state => {
    const [playerX, playerY, playerZ] = playerStore.getState().velocity;
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed * 0.5;
      // const a = Math.cos(t) + Math.sin(t * 1) / 10;
      // const b = Math.sin(t) + Math.cos(t * 2) / 10;
      // const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const a = 100;
      const b = Math.sin(t);
      const s = Math.cos(t);
      particle.mx += (0 - particle.mx) * 0.001;
      particle.my += (0 * -1 - particle.my) * 0.001;
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * 1 +
          xFactor +
          Math.cos(state.clock.elapsedTime * 0.05) +
          Math.sin(state.clock.elapsedTime * 0.05) * 10,
        particle.my / 10 +
          yFactor +
          Math.sin(t * 0.01 * factor) +
          (Math.cos(t * 0.5) * factor) / 10,
        zFactor
      );
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[0.05]} />
        {/* <meshPhongMaterial color="#395e4a" /> */}
        <meshPhongMaterial
          attach="material"
          flatShading={false}
          specular="#80ffec"
          color="#395e4a"
          shininess={1}
          reflectivity={0.5}
          transparent
          opacity={0.75}
        />
      </instancedMesh>
    </>
  );
}
