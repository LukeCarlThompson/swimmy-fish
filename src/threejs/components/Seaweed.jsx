import React, { useRef, useLayoutEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Object3D } from "three/src/core/Object3D.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import worldStore from "../../stores/worldStore";
import imgUrlWide from "../../images/seaweed-03.png";

const SeaweedWide = ({ number }) => {
  const colorMap = useLoader(TextureLoader, imgUrlWide);
  // This positions the texture on the plane. Puts the bottom center at the middle of the plane;
  colorMap.offset.set(0, -1);
  colorMap.repeat.set(1, 2);

  const coordsRef = useRef(
    Array.from(Array(number)).map((item) => [Math.random() - 0.5, Math.random(), Math.random() * 0.5])
  );

  const mesh = useRef();
  const dummy = useRef(new Object3D());
  const positions = useRef(
    coordsRef.current.map((item, i) => {
      const positionX = item[0] * 200;
      const positionZ = item[1] * -100 + 10;
      const rotationY = item[2];

      return { positionX, positionZ, rotationY };
    }),
    []
  );

  useLayoutEffect(() => {
    positions.current.forEach((item, i) => {
      const { positionX, positionZ, rotationY } = item;
      const randomHeight = Math.random() * Math.random() * 2 + 0.2;
      item.position = [positionX, -10, positionZ - (Math.sin(i) + 1) * 10];

      dummy.current.position.set(...item.position);

      item.scale = [randomHeight, randomHeight, 1];
      dummy.current.scale.set(...item.scale);
      dummy.current.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.current.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { sin } = Math;

  useFrame((state) => {
    positions.current.forEach((item, i) => {
      const motion = sin(state.clock.elapsedTime + item.position[0] * 0.03) * 0.1;
      dummy.current.scale.set(...item.scale);
      dummy.current.position.set(...item.position);
      dummy.current.rotation.set(motion * 1, motion * -2, motion);
      dummy.current.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.current.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, positions.current.length]}>
      <planeGeometry args={[8, 8]} />
      <meshLambertMaterial
        attach="material"
        color={worldStore.groundBaseColor}
        transparent
        alphaTest={0.5}
        // opacity={1}
        map={colorMap}
        // alphaMap={colorMap}
        // normalMap={colorMap}
        // roughnessMap={colorMap}
        // aoMap={colorMap}
      />
    </instancedMesh>
  );
};

const Seaweed = ({ number }) => {
  return (
    <>
      <SeaweedWide number={number} />
    </>
  );
};

export default Seaweed;
