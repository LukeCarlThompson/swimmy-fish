import { Object3D } from "three/src/core/Object3D.js";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export default function Particles({ count }) {
  const mesh = useRef();
  const { sin, cos, random } = Math;

  const dummy = useMemo(() => new Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = random() * 100;
      const factor = 10 + random();
      const speed = 0.01;
      const xFactor = -100 + random() * 200;
      const yFactor = random() * 12 - 10;
      const zFactor = -100 + random() * 150;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count, random]);
  // The innards of this hook will run every frame
  useFrame((state, delta) => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed * 0.5;
      particle.mx += (0 - particle.mx) * 0.001;
      particle.my += (0 * -1 - particle.my) * 0.001;
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * 1 +
          xFactor +
          cos(state.clock.elapsedTime * 0.05) +
          sin(state.clock.elapsedTime * 0.05) * 10,
        particle.my / 10 + yFactor + sin(t * 0.01 * factor) + (cos(t * 0.5) * factor) / 10,
        zFactor
      );
      // dummy.rotation.set(s * 5, s * 5, s * 5);
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
        <meshLambertMaterial attach="material" color="#275e5c" />
      </instancedMesh>
    </>
  );
}
