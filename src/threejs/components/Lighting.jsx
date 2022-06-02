import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as MathUtils from "three/src/math/MathUtils.js";
import { Color } from "three/src/math/Color.js";
import playerStore from "../../stores/playerStore";

const Lighting = () => {
  const ambientLightRef = useRef();
  const spotLightRef = useRef();
  const colorRef = useRef(new Color());

  useFrame(() => {
    const { isUnderWater } = playerStore;

    ambientLightRef.current.intensity = MathUtils.lerp(
      ambientLightRef.current.intensity,
      isUnderWater ? 0.1 : 0.5,
      0.1
    );

    ambientLightRef.current.color.lerp(
      isUnderWater ? colorRef.current.set("#ffffff") : colorRef.current.set("#ffdb4a"),
      0.1
    );
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.3} color="white" />
      <spotLight
        ref={spotLightRef}
        position={[0, 150, -300]}
        angle={0.3}
        intensity={50}
        distance={400}
        decay={3}
        penumbra={1}
        color="white"
      />
    </>
  );
};

export default Lighting;
