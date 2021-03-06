import React, { useRef, useLayoutEffect, useMemo } from "react";
// import { useSpring, a } from '@react-spring/three';
import { useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Sphere, RoundedBox } from "@react-three/drei";
import { Vector3 } from "three/src/math/Vector3.js";
import * as MathUtils from "three/src/math/MathUtils.js";
import playerStore from "../../stores/playerStore";
import worldStore from "../../stores/worldStore";
import { sigmoid, degToRad } from "../helpers";

// TODO: Try and use instances of a cube for the fish geometry to increase performance

const BodyMaterial = ({ color }) => {
  const bodyMaterialRef = useRef();

  useFrame(() => {
    // Modify player material appearance based on depth
    bodyMaterialRef.current.envMapIntensity = playerStore.position[1] > 0 ? 1 : 1 + playerStore.position[1] * 0.1;
    // bodyMaterialRef.current.clearcoat = position[1] > 0 ? 1 : 1 + position[1] * 0.1;
    // bodyMaterialRef.current.reflectivity = position[1] > 0 ? 0.3 : 0.3 + position[1] * 0.1;
    // bodyMaterialRef.current.roughness = position[1] > -3 ? 0.7 : 0.7 - position[1] * 0.1;
  });

  console.log("body material");

  return (
    <meshPhysicalMaterial
      ref={bodyMaterialRef}
      attach="material"
      flatShading={false}
      specular="#ffffff"
      roughness={0.7}
      reflectivity={0.3}
      metalness={0.5}
      clearcoat={1}
      clearcoatRoughness={0.2}
      color={color || "purple"}
    />
  );
};

const Tail = ({ material }) => {
  const tailRef = useRef();
  const tailSecondRef = useRef();
  const tailThirdRef = useRef();

  const { abs, sin } = Math;

  useFrame((state, delta) => {
    const { velocity, position } = playerStore;

    const [velocityX, velocityY, velocityZ] = velocity;
    const [positionX, positionY, positionZ] = position;

    // tail movement
    const sideToSide = degToRad(
      sin(abs(velocityY) + abs(positionY) + abs(velocityX) + abs(positionX) + state.clock.getElapsedTime() * 4)
    );

    tailRef.current.rotation.set(0, sideToSide * 10, 0);
    tailSecondRef.current.rotation.set(0, sideToSide * 25, 0);
    tailThirdRef.current.rotation.set(0, sideToSide * 25, 0);
  });

  return (
    <group ref={tailRef} name="tail">
      <RoundedBox args={[1, 0.75, 0.6]} position={[-0.5, 0.05, 0]} radius={0.2} smoothness={1} receiveShadow castShadow>
        {material}
      </RoundedBox>
      <group ref={tailSecondRef} position={[-1, 0, 0]}>
        <RoundedBox
          args={[0.6, 0.6, 0.3]}
          position={[-0.1, 0, 0]}
          radius={0.05}
          smoothness={1}
          receiveShadow
          castShadow
        >
          {material}
        </RoundedBox>
        <group ref={tailThirdRef} position={[-0.4, 0, 0]}>
          <RoundedBox
            args={[0.75, 0.4, 0.1]}
            position={[-0.1, 0.15, 0]}
            radius={0.05}
            smoothness={1}
            rotation={[0, 0, -10]}
            receiveShadow
            castShadow
          >
            {material}
          </RoundedBox>
          <RoundedBox
            args={[0.75, 0.4, 0.1]}
            position={[-0.1, -0.15, 0]}
            radius={0.05}
            smoothness={1}
            rotation={[0, 0, 10]}
            receiveShadow
            castShadow
          >
            {material}
          </RoundedBox>
        </group>
      </group>
    </group>
  );
};

const EyeBall = (props) => {
  const ref = useRef();
  const vec3 = new Vector3();

  useFrame((state) => {
    const [x, y, z] = playerStore.velocity;

    const direction = vec3.set(sigmoid(y * -0.1), sigmoid(y * -1) * 0.1 + 0.5, 0);
    ref.current.setRotationFromAxisAngle(direction.normalize(), props.mirror ? -10 : 0.5);
  });

  return (
    <group {...props} ref={ref} name="eyeball">
      <Sphere position={[0, 0, 0]} args={[0.3]} receiveShadow castShadow>
        <BodyMaterial translate={[0, 10, 0.25]} attach="material" color="#f3f3f3" />
      </Sphere>
      <Sphere position={[0, 0, 0.25]} args={[0.1]} receiveShadow castShadow>
        <BodyMaterial translate={[0, 10, 0.25]} attach="material" color="black" />
      </Sphere>
    </group>
  );
};

const Player = ({ material = <BodyMaterial color="#e07e28" /> }) => {
  const [playerPhysicsRef, api] = useSphere(() => ({
    mass: 1,
    position: [0, 0, 0],
    linearDamping: 0.75,
    linearFactor: [1, 1, 0],
    angularFactor: [0, 0, 0],
    // fixedRotation: true,
    args: [1],
    allowSleep: false,
  }));
  const leftFinRef = useRef();
  const rightFinRef = useRef();
  const playerBodyRef = useRef();
  const vec3 = new Vector3();
  const { abs, sin, atan2 } = Math;

  useLayoutEffect(() => {
    // Save the player uuid to state
    playerStore.uuid = playerPhysicsRef.current.uuid;
    // Save the player cannon api to state
    playerStore.cannonApi = api;

    // Subscribe the velocity, position and rotation from Cannon to some local refs
    const unsubscribeVelocity = api.velocity.subscribe((v) => {
      playerStore.velocity = v;
    });

    const unsubscribePosition = api.position.subscribe((p) => {
      playerStore.position = p;
    });

    const unsubscribeDamping = api.linearDamping.subscribe((d) => {
      playerStore.damping = d;
    });

    return () => {
      unsubscribeVelocity();
      unsubscribePosition();
      unsubscribeDamping();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    // console.log("delta -->", delta);
    let { controls, isUnderWater, position, velocity, mousePosition, damping } = playerStore;

    const [velocityX, velocityY, velocityZ] = velocity;
    const [mouseX, mouseY] = mousePosition;
    const [positionX, positionY, positionZ] = position;

    // Set underwater state based on position
    if (positionY > worldStore.waterHeight) {
      playerStore.isUnderWater = false;
    } else {
      playerStore.isUnderWater = true;
    }

    if (isUnderWater) {
      if (controls.up) {
        api.applyImpulse([0, 0.4, 0], [0, 0, 0]);
      }

      if (controls.down) {
        api.applyImpulse([0, -0.4, 0], [0, 0, 0]);
      }

      if (controls.right) {
        api.applyImpulse([0.4, 0, 0], [0, 0, 0]);
      }

      if (controls.left) {
        api.applyImpulse([-0.4, 0, 0], [0, 0, 0]);
      }

      if (controls.mouse) {
        api.applyImpulse([mouseX * 0.1, mouseY * 0.1, 0], [0, 0, 0]);
      }
    }

    // Apply some damping if underwater and moving too fast downwards
    const newDamping = (isUnderWater && velocityY) < -10 ? 0.99 : isUnderWater ? 0.75 : 0.01;
    api.linearDamping.set(MathUtils.lerp(damping, newDamping, 0.5));

    if (!isUnderWater && positionY > 10.25) {
      api.applyImpulse([0, -0.5, 0], [0, 0, 0]);
    }

    // Push swimmy back up from the ground
    if (positionY < -8) {
      api.applyImpulse([0, 0.05, 0], [0, 0, 0]);
    }

    // Push swimmy back into his garden if he swims out
    if (abs(positionX) > 100) {
      api.applyImpulse([positionX * -0.01, 0, 0], [0, 0, 0]);
    }

    // Velocity factor for the head wobble
    const velocityInput = abs(velocityY) + abs(positionY) + abs(velocityX) + abs(positionX);
    // Main player body wobble when idle and when swimming
    const wobble = sin(velocityInput + state.clock.getElapsedTime() * 4) * -10;

    const direction = {
      y: (sigmoid(velocityX * 0.5) * 0.5 - 0.5) * 180 + wobble,
      z: sigmoid(velocityY * 0.2) * 90,
    };

    const { rotation } = playerBodyRef.current;
    playerStore.rotation = [rotation.x, rotation.y, rotation.z];

    // Calculate the angle from the player to the mouse position
    // If the mouse is close to the player use the angle otherwise just flip it to left or right
    const mouseYAngle =
      abs(mouseX) < 3 ? atan2(mouseX, abs(mouseY)) - Math.PI * 0.5 : mouseX > 0 ? degToRad(1) : degToRad(-179);
    const mouseZAngle = atan2(mouseY, abs(mouseX));

    // Lerp the player rotation to angles based on mouse position or velocity
    const yAxisRotation = MathUtils.lerp(
      rotation.y,
      controls.mouse & isUnderWater ? mouseYAngle + degToRad(wobble) : degToRad(direction.y),
      delta * 10
    );

    const zAxisRotation = MathUtils.lerp(
      rotation.z,
      controls.mouse & isUnderWater ? mouseZAngle : degToRad(direction.z),
      delta * 5
    );

    playerBodyRef.current.rotation.set(0, yAxisRotation, zAxisRotation);

    // Side fins rotation
    leftFinRef.current.setRotationFromAxisAngle(vec3.lerp(vec3.set(sigmoid(velocityY * 1), -1, 0), 0.25), 0.5);
    rightFinRef.current.setRotationFromAxisAngle(vec3.lerp(vec3.set(sigmoid(velocityY * 1) * -1, 1, 0), 0.25), 0.5);
  });

  return (
    <group ref={playerPhysicsRef} name="player-physics-object">
      <group ref={playerBodyRef} name="player-body-group">
        <RoundedBox
          name="player-body-main"
          args={[1.5, 1.2, 0.8]}
          position={[0.25, 0.1, 0]}
          radius={0.2}
          smoothness={1}
          receiveShadow
          castShadow
        >
          {material}
        </RoundedBox>
        <RoundedBox
          name="player-body-mouth"
          args={[0.7, 0.5, 0.8]}
          position={[0.8, -0.25, 0]}
          rotation={[0, 0, 0]}
          radius={0.2}
          smoothness={1}
          receiveShadow
          castShadow
        >
          {material}
        </RoundedBox>
        <RoundedBox
          name="player-dorsal-fin"
          args={[0.5, 0.5, 0.05]}
          position={[0.25, 0.7, 0]}
          radius={0.05}
          smoothness={1}
          rotation={[0, 0, 10]}
          receiveShadow
          castShadow
        >
          {material}
        </RoundedBox>
        <RoundedBox
          ref={leftFinRef}
          name="player-left-fin"
          args={[0.5, 0.1, 0.6]}
          position={[-0, -0.25, 0.4]}
          radius={0.05}
          smoothness={1}
          receiveShadow
          castShadow
        >
          {material}
        </RoundedBox>
        <RoundedBox
          ref={rightFinRef}
          name="player-right-fin"
          args={[0.5, 0.1, 0.6]}
          position={[-0, -0.25, -0.4]}
          radius={0.05}
          smoothness={1}
          receiveShadow
          castShadow
        >
          {material}
        </RoundedBox>
        <RoundedBox
          name="player-lips"
          args={[0.1, 0.1, 0.5]}
          position={[1.11, -0.3, 0]}
          radius={0.05}
          smoothness={1}
          receiveShadow
          castShadow
        >
          <BodyMaterial color="#2e2929" />
        </RoundedBox>
        <EyeBall name="player-left-eye" position={[0.6, 0.1, 0.35]} />
        <EyeBall name="player-right-eye" position={[0.6, 0.1, -0.35]} mirror />
        <Tail name="player-tail-group" material={material} />
      </group>
    </group>
  );
};

export default Player;
