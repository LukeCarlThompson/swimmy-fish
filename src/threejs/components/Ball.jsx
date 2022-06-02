import React, { useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Color } from "three/src/math/Color.js";

const Ball = (props) => {
  const material = useRef();
  const isTouchedRef = useRef(false);
  const ballPosition = useRef([0, 0, 0]);
  const initialColorRef = useRef(new Color("hsl(228, 90%, 50%)"));
  const touchedColorRef = useRef(new Color("hsl(342, 80%, 37%)"));

  const size = props.size || 0.5;

  const [ref, api] = useSphere(() => ({
    mass: size * 0.2,
    position: props.position,
    linearDamping: 0.2,
    linearFactor: [1, 1, 0],
    args: [size],
    allowSleep: true,
    sleepSpeedLimit: 0.25,
    onCollide: (e) => {
      isTouchedRef.current = !isTouchedRef.current;
    },
    ...props,
  }));

  useLayoutEffect(() => {
    const unsubscribePosition = api.position.subscribe((p) => {
      ballPosition.current = p;
    });

    return () => {
      unsubscribePosition();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (isTouchedRef.current) {
      material.current.color.lerpHSL(touchedColorRef.current, 0.05);
      // material.current.distort = 1;
    } else {
      material.current.color.lerpHSL(initialColorRef.current, 0.05);
      // material.current.distort = 0.5;
    }

    const [x, y] = ballPosition.current;

    // Push back into water if it goes out
    if (y > 10) {
      api.applyImpulse([0, y * -0.01, 0], [0, 0, 0]);
    }

    // Push ball back up from the ground
    if (y < -8) {
      api.applyImpulse([0, 0.01, 0], [0, 0, 0]);
    }

    // Push ball back into his garden if it goes out
    if (Math.abs(x) > 100) {
      api.applyImpulse([x * -0.01, 0, 0], [0, 0, 0]);
    }
  });

  return (
    <group ref={ref}>
      <Sphere position={[0, 0, 0]} args={[size]} receiveShadow castShadow>
        {/* <meshLambertMaterial ref={material} attach="material" color="#275e5c" /> */}
        <MeshDistortMaterial
          ref={material}
          attach="material"
          color={`hsl(${340}, ${88}%, ${60}%)`}
          // transparent
          // opacity={0.8}
          metalness={1}
          specular="#0068b3"
          roughness={0.7}
          reflectivity={0.5}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
        />
      </Sphere>
    </group>
  );
};

export default Ball;
