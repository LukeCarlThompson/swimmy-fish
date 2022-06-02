import React, { useRef, useMemo, Suspense, useLayoutEffect } from "react";
import { useFrame, useThree, Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import worldStore from "../../stores/worldStore";
import imgUrl from "../../images/rocks-01.png";
import RocksTwoImgUrl from "../../images/rocks-02.png";

const RockTwo = (props) => {
  const colorMap = useLoader(TextureLoader, RocksTwoImgUrl);
  // This positions the texture on the plane.
  // colorMap.offset.set(0, -1);
  // colorMap.repeat.set(1, 2);

  return (
    <mesh position={[-10, -7, -130]}>
      <planeGeometry args={[400, 18]} />
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
    </mesh>
  );
};

const RockOne = (props) => {
  const colorMap = useLoader(TextureLoader, imgUrl);
  // This positions the texture on the plane.
  // colorMap.offset.set(0, -1);
  // colorMap.repeat.set(1, 2);

  return (
    <mesh position={[25, -9, -80]}>
      <planeGeometry args={[20, 10]} />
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
    </mesh>
  );
};

const BackgroundImages = (props) => {
  return (
    <group>
      <RockOne />
      <RockTwo />
    </group>
  );
};

export default BackgroundImages;
