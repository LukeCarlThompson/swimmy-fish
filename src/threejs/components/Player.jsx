import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  createRef,
} from 'react';
// import { useSpring, a } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { Plane, Sphere, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import playerStore from '../../stores/playerStore';
import { sigmoid, degToRad } from '../helpers';

const BodyMaterial = props => (
  <meshPhysicalMaterial
    attach="material"
    flatShading={false}
    specular="#eff41c"
    roughness={0.7}
    reflectivity={1}
    metalness={1}
    clearcoat={1}
    clearcoatRoughness={0.2}
    color={props.color || 'purple'}
  />
);

const Tail = props => {
  const tailRef = useRef();
  const tailSecondRef = useRef();
  const tailThirdRef = useRef();

  useFrame(state => {
    const [velocityX, velocityY, velocityZ] = playerStore.getState().velocity;
    const [positionX, positionY, positionZ] = playerStore.getState().position;

    // tail movement
    const sideToSide = degToRad(
      Math.sin(
        Math.abs(velocityY) +
          Math.abs(positionY) +
          Math.abs(velocityX) +
          Math.abs(positionX) +
          state.clock.getElapsedTime() * 4
      )
    );

    tailRef.current.rotation.set(0, sideToSide * 10, 0);
    tailSecondRef.current.rotation.set(0, sideToSide * 25, 0);
    tailThirdRef.current.rotation.set(0, sideToSide * 25, 0);
  });

  return (
    <group ref={tailRef}>
      <RoundedBox
        args={[1, 0.75, 0.6]}
        position={[-0.5, 0.05, 0]}
        radius={0.2}
        smoothness={4}
        receiveShadow
        castShadow
      >
        <BodyMaterial color={props.color} />
      </RoundedBox>
      <group ref={tailSecondRef} position={[-1, 0, 0]}>
        <RoundedBox
          args={[0.6, 0.6, 0.3]}
          position={[-0.1, 0, 0]}
          radius={0.05}
          smoothness={4}
          receiveShadow
          castShadow
        >
          <BodyMaterial color={props.color} />
        </RoundedBox>
        <group ref={tailThirdRef} position={[-0.4, 0, 0]}>
          <RoundedBox
            args={[0.75, 0.4, 0.1]}
            position={[-0.1, 0.15, 0]}
            radius={0.05}
            smoothness={4}
            rotation={[0, 0, -10]}
            receiveShadow
            castShadow
          >
            <BodyMaterial color={props.color} />
          </RoundedBox>
          <RoundedBox
            args={[0.75, 0.4, 0.1]}
            position={[-0.1, -0.15, 0]}
            radius={0.05}
            smoothness={4}
            rotation={[0, 0, 10]}
            receiveShadow
            castShadow
          >
            <BodyMaterial color={props.color} />
          </RoundedBox>
        </group>
      </group>
    </group>
  );
};

const EyeBall = props => {
  const ref = useRef();
  const vec3 = new THREE.Vector3();

  useFrame(state => {
    const [x, y, z] = playerStore.getState().velocity;

    const direction = vec3.set(
      sigmoid(y * -0.1),
      sigmoid(y * -1) * 0.1 + 0.5,
      0
    );
    ref.current.setRotationFromAxisAngle(
      direction.normalize(),
      props.mirror ? -10 : 0.5
    );
  });

  return (
    <group {...props} ref={ref}>
      <Sphere position={[0, 0, 0]} args={[0.3]} receiveShadow castShadow>
        <BodyMaterial
          translate={[0, 10, 0.25]}
          attach="material"
          color="#f3f3f3"
        />
      </Sphere>
      <Sphere position={[0, 0, 0.25]} args={[0.1]} receiveShadow castShadow>
        <BodyMaterial
          translate={[0, 10, 0.25]}
          attach="material"
          color="black"
        />
      </Sphere>
    </group>
  );
};

const Player = props => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 0, 0],
    linearDamping: 0.5,
    linearFactor: [1, 1, 0],
    angularFactor: [1, 1, 0],
    ...props,
  }));
  const leftFinRef = useRef();
  const rightFinRef = useRef();
  const vec3 = new THREE.Vector3();
  const velocityRef = useRef([0, 0, 0]);
  const positionRef = useRef([0, 0, 0]);
  const rotationRef = useRef([0, 0, 0]);

  console.log('Player');

  useLayoutEffect(() => {
    console.count('subscribed');
    // Subscribe the velocity, position and rotation from Cannon to some local refs
    const unsubscribeVelocity = api.velocity.subscribe(v => {
      velocityRef.current = v;
    });

    const unsubscribePosition = api.position.subscribe(p => {
      positionRef.current = p;
    });

    const unsubscribeRotation = api.rotation.subscribe(r => {
      rotationRef.current = r;
    });

    return () => {
      console.count('unsubscribed');
      unsubscribeVelocity();
      unsubscribePosition();
      unsubscribeRotation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(state => {
    const { controls } = playerStore.getState();

    const [velocityX, velocityY, velocityZ] = velocityRef.current;
    const [mouseX, mouseY] = playerStore.getState().mousePosition;
    // const [rotationX, rotationY, rotationZ] = playerStore.getState().rotation;
    const [positionX, positionY, positionZ] = positionRef.current;

    if (controls.up) {
      api.velocity.set(velocityX, velocityY + 0.2, velocityZ);
    }

    if (controls.down) {
      api.velocity.set(velocityX, velocityY - 0.2, velocityZ);
    }

    if (controls.right) {
      api.velocity.set(velocityX + 0.5, velocityY, velocityZ);
    }

    if (controls.left) {
      api.velocity.set(velocityX - 0.5, velocityY, velocityZ);
    }

    if (controls.mouse) {
      api.velocity.set(
        velocityX + mouseX * 0.1,
        velocityY + mouseY * 0.1,
        velocityZ
      );
      // api.applyImpulse([mouseX * 0.1, mouseY * 0.1, 0], [0, 0, 0]);
    }

    // Main player body rotation
    // TODO: Change direction based on input not velocity and lerp or spring to the new direction.

    const wobble =
      Math.sin(
        Math.abs(velocityY) +
          Math.abs(positionY) +
          Math.abs(velocityX) +
          Math.abs(positionX) +
          state.clock.getElapsedTime() * 4
      ) * -10;

    const direction = {
      y: degToRad((sigmoid(velocityX * 0.5) * 0.5 - 0.5) * 180 + wobble),
      z: degToRad(sigmoid(velocityY * 0.2) * 90),
    };

    // Set the player main rotation
    api.rotation.set(0, direction.y, direction.z);

    // Sync state from local refs back to the global state
    playerStore.setState({ rotation: rotationRef.current });
    playerStore.setState({ velocity: velocityRef.current });
    playerStore.setState({ position: positionRef.current });

    // Side fins rotation
    leftFinRef.current.setRotationFromAxisAngle(
      vec3.lerp(vec3.set(sigmoid(velocityY * 1), -1, 0), 0.25),
      0.5
    );
    rightFinRef.current.setRotationFromAxisAngle(
      vec3.lerp(vec3.set(sigmoid(velocityY * 1) * -1, 1, 0), 0.25),
      0.5
    );
  });

  return (
    <group ref={ref}>
      <RoundedBox
        args={[1.5, 1.2, 0.8]}
        position={[0.25, 0.1, 0]}
        radius={0.2}
        smoothness={4}
        receiveShadow
        castShadow
      >
        <BodyMaterial color={props.color} />
      </RoundedBox>
      <RoundedBox
        args={[0.7, 0.5, 0.8]}
        position={[0.8, -0.25, 0]}
        rotation={[0, 0, 0]}
        radius={0.2}
        smoothness={6}
        receiveShadow
        castShadow
      >
        <BodyMaterial color={props.color} />
      </RoundedBox>
      {/* Dorsal fin */}
      <RoundedBox
        args={[0.5, 0.5, 0.05]}
        position={[0.25, 0.7, 0]}
        radius={0.05}
        smoothness={4}
        rotation={[0, 0, 10]}
        receiveShadow
        castShadow
      >
        <BodyMaterial color={props.color} />
      </RoundedBox>
      {/* Side fins */}
      <RoundedBox
        ref={leftFinRef}
        args={[0.5, 0.1, 0.6]}
        position={[-0, -0.25, 0.4]}
        radius={0.05}
        smoothness={4}
        receiveShadow
        castShadow
      >
        <BodyMaterial color={props.color} />
      </RoundedBox>
      <RoundedBox
        ref={rightFinRef}
        args={[0.5, 0.1, 0.6]}
        position={[-0, -0.25, -0.4]}
        radius={0.05}
        smoothness={4}
        receiveShadow
        castShadow
      >
        <BodyMaterial color={props.color} />
      </RoundedBox>
      {/* lips */}
      <RoundedBox
        args={[0.1, 0.1, 0.5]}
        position={[1.11, -0.3, 0]}
        radius={0.05}
        smoothness={4}
        receiveShadow
        castShadow
      >
        <BodyMaterial color="#2e2929" />
      </RoundedBox>
      {/* Eyeball */}
      <EyeBall position={[0.6, 0.1, 0.35]} />
      <EyeBall position={[0.6, 0.1, -0.35]} mirror />
      {/* Tail */}
      <Tail color={props.color} />
    </group>
  );
};

export default Player;
