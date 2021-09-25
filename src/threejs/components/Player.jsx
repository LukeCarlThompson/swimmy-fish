import React, {
  useState,
  useRef,
  useEffect,
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
  <meshPhongMaterial
    attach="material"
    flatShading={false}
    specular="#eff41c"
    color={props.color || 'purple'}
  />
);

const Tail = props => {
  const tailRef = useRef();
  const tailSecondRef = useRef();
  const tailThirdRef = useRef();
  // const vec3 = new THREE.Vector3();

  useFrame(state => {
    const [velocityX, velocityY, velocityZ] = playerStore.getState().velocity;

    // tail movement
    const sideToSide = degToRad(
      Math.sin(velocityY + velocityX + state.clock.getElapsedTime() * 4)
    );
    tailRef.current.rotation.set(0, sideToSide * 10, 0);
    tailSecondRef.current.rotation.set(0, sideToSide * 20, 0);
    tailThirdRef.current.rotation.set(0, sideToSide * 20, 0);
  });

  return (
    <group ref={tailRef}>
      <RoundedBox
        args={[1, 0.75, 0.6]}
        position={[-0.5, 0.05, 0]}
        radius={0.2}
        smoothness={4}
      >
        <BodyMaterial color={props.color} />
      </RoundedBox>
      <group ref={tailSecondRef} position={[-1, 0, 0]}>
        <RoundedBox
          args={[0.6, 0.6, 0.3]}
          position={[-0.1, 0, 0]}
          radius={0.05}
          smoothness={4}
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
          >
            <BodyMaterial color={props.color} />
          </RoundedBox>
          <RoundedBox
            args={[0.75, 0.4, 0.1]}
            position={[-0.1, -0.15, 0]}
            radius={0.05}
            smoothness={4}
            rotation={[0, 0, 10]}
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
    const lerpOutput = vec3.lerp(
      vec3.set(sigmoid(y * -0.1), sigmoid(y * -1) * 0.1 + 0.5, 0),
      0.25
    );
    ref.current.setRotationFromAxisAngle(
      lerpOutput.normalize(),
      props.mirror ? -10 : 0.5
    );
  });

  return (
    <group {...props} ref={ref}>
      <Sphere position={[0, 0, 0]} args={[0.3]}>
        <BodyMaterial
          translate={[0, 10, 0.25]}
          attach="material"
          color="#f3f3f3"
        />
      </Sphere>
      <Sphere position={[0, 0, 0.25]} args={[0.1]}>
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

  console.log('Player');

  useEffect(() => {
    // Subscribe the velovity and position from Cannon to the player state object
    const unsubscribeVelocity = api.velocity.subscribe(v => {
      playerStore.setState({ velocity: v });
    });

    const unsubscribePosition = api.position.subscribe(p => {
      playerStore.setState({ position: p });
    });

    const unsubscribeRotation = api.rotation.subscribe(r => {
      playerStore.setState({ rotation: r });
    });

    return () => {
      unsubscribeVelocity();
      unsubscribePosition();
      unsubscribeRotation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(state => {
    const [velocityX, velocityY, velocityZ] = playerStore.getState().velocity;
    const [mouseX, mouseY] = playerStore.getState().mousePosition;
    // const [rotationX, rotationY, rotationZ] = playerStore.getState().rotation;
    // const [positionX, positionY, positionZ] = playerStore.getState().position;

    if (props.up) {
      api.velocity.set(velocityX, velocityY + 0.2, velocityZ);
    }

    props.down && api.velocity.set(velocityX, velocityY - 0.2, velocityZ);

    props.right && api.velocity.set(velocityX + 1, velocityY, velocityZ);

    props.left && api.velocity.set(velocityX - 1, velocityY, velocityZ);

    if (props.applyForce) {
      api.velocity.set(
        velocityX + mouseX * 0.1,
        velocityY + mouseY * 0.1,
        velocityZ
      );
      // api.applyImpulse([mouseX * 0.1, mouseY * 0.1, 0], [0, 0, 0]);
    }

    // Lock position in place on z-axis
    // api.position.set(positionX, positionY, 0);

    // console.log('turning -->', sigmoid(velocityX / 10) * 180);

    // TODO: try setting impulse instead of velocity api.applyImpulse([0, 5, -10], [1, 1, 1])

    // Main player body rotation
    // TODO: Change direction based on input not velocity and lerp or spring to the new direction.
    // api.rotation.set(0, 0, degToRad(sigmoid(velocityY / 10) * 45));

    // console.log('rotationX -->', rotationX);

    // const wobble = Math.sin(state.clock.getElapsedTime() * 10) * 5;

    const wobble =
      Math.sin(velocityY + velocityX + state.clock.getElapsedTime() * 4) * -10;

    const lerpOutput = vec3.lerp(
      vec3.set(
        0,
        degToRad((sigmoid(velocityX * 0.25) * 0.5 - 0.5) * 180 + wobble),
        // degToRad(velocityX >= 0 ? rotationX * 0.9 : 180),
        degToRad(sigmoid(velocityY / 5) * 60)
      ),
      0.1
    );
    api.rotation.set(0, lerpOutput.y, lerpOutput.z);

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
      >
        <BodyMaterial color={props.color} />
      </RoundedBox>
      {/* <RoundedBox
        args={[1, 0.75, 0.6]}
        position={[-0.5, 0.05, 0]}
        radius={0.2}
        smoothness={4}
      >
        <BodyMaterial color={props.color} />
      </RoundedBox> */}
      <RoundedBox
        args={[0.7, 0.5, 0.8]}
        position={[0.8, -0.25, 0]}
        rotation={[0, 0, 0]}
        radius={0.1}
        smoothness={6}
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
      >
        <BodyMaterial color={props.color} />
      </RoundedBox>
      <RoundedBox
        ref={rightFinRef}
        args={[0.5, 0.1, 0.6]}
        position={[-0, -0.25, -0.4]}
        radius={0.05}
        smoothness={4}
      >
        <BodyMaterial color={props.color} />
      </RoundedBox>
      {/* lips */}
      <RoundedBox
        args={[0.1, 0.1, 0.5]}
        position={[1.15, -0.4, 0]}
        radius={0.05}
        smoothness={4}
      >
        <meshPhysicalMaterial attach="material" color="black" />
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
