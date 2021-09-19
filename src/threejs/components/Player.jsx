import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  createRef,
} from 'react';
import { useSpring, a } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import { Physics, useBox } from '@react-three/cannon';
import { Plane, Sphere, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import playerStore from '../../stores/playerStore';
import { sigmoid, degToRad } from '../helpers';

const Tail = props => {
  const tailRef = useRef();
  const vec3 = new THREE.Vector3();

  useFrame(state => {
    const [velocityX, velocityY, velocityZ] = playerStore.getState().velocity;

    // tail movement
    tailRef.current.rotation.set(
      0,
      degToRad(Math.sin(velocityY * 0.5 + state.clock.getElapsedTime() * 2)) *
        35,
      0
    );
  });

  return (
    <group ref={tailRef} position={[-1, 0, 0]}>
      <RoundedBox
        args={[0.6, 0.6, 0.2]}
        position={[-0.2, 0, 0]}
        radius={0.05}
        smoothness={4}
      >
        <meshPhongMaterial attach="material" color={props?.color || 'purple'} />
      </RoundedBox>
      <RoundedBox
        args={[0.75, 0.4, 0.1]}
        position={[-0.6, 0.15, 0]}
        radius={0.05}
        smoothness={4}
        rotation={[0, 0, -10]}
      >
        <meshPhongMaterial attach="material" color={props?.color || 'purple'} />
      </RoundedBox>
      <RoundedBox
        args={[0.75, 0.4, 0.1]}
        position={[-0.6, -0.15, 0]}
        radius={0.05}
        smoothness={4}
        rotation={[0, 0, 10]}
      >
        <meshPhongMaterial attach="material" color={props?.color || 'purple'} />
      </RoundedBox>
    </group>
  );
};

const EyeBall = props => {
  const ref = useRef();
  const vec3 = new THREE.Vector3();

  useFrame(state => {
    const [x, y, z] = playerStore.getState().velocity;
    const lerpOutput = vec3.lerp(
      vec3.set(sigmoid(y * -1), sigmoid(y * -0.5) * 0.25 + 0.5, 0),
      0.25
    );
    ref.current.setRotationFromAxisAngle(lerpOutput, 0.5);
  });

  return (
    <group {...props} ref={ref}>
      <Sphere position={[0, 0, 0]} args={[0.3]}>
        <meshPhongMaterial attach="material" color="#f3f3f3" />
      </Sphere>
      <Sphere position={[0, 0, 0.25]} args={[0.1]}>
        <meshPhongMaterial
          translate={[0, 10, 0.25]}
          attach="material"
          color="black"
        />
      </Sphere>
    </group>
  );
};

const Player = props => {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));
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

    return () => {
      unsubscribeVelocity();
      unsubscribePosition();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    const [velocityX, velocityY, velocityZ] = playerStore.getState().velocity;

    if (props.up) {
      api.velocity.set(0, velocityY + 1, 0);
    }

    props.down && api.velocity.set(0, velocityY - 1, 0);

    props.right && api.velocity.set(velocityX + 1, velocityY, 0);

    props.left && api.velocity.set(velocityX - 1, velocityY, 0);

    // Main player body rotation
    api.rotation.set(0, 0, degToRad(sigmoid(velocityY / 10) * 45));

    // Side fins rotation
    leftFinRef.current.setRotationFromAxisAngle(
      vec3.lerp(vec3.set(sigmoid(velocityY * 0.5), -0.8, 0), 0.25),
      0.5
    );
    rightFinRef.current.setRotationFromAxisAngle(
      vec3.lerp(vec3.set(sigmoid(velocityY * 0.5) * -1, 0.8, 0), 0.25),
      0.5
    );
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[2, 1, 1]} radius={0.15} smoothness={4}>
        <meshPhongMaterial attach="material" color={props?.color || 'purple'} />
      </RoundedBox>
      <RoundedBox
        args={[0.5, 0.5, 0.9]}
        position={[0.9, -0.25, 0]}
        rotation={[0, 0, 0]}
        radius={0.1}
        smoothness={4}
      >
        <meshPhongMaterial attach="material" color={props?.color || 'purple'} />
      </RoundedBox>
      {/* Dorsal fin */}
      <RoundedBox
        args={[0.5, 0.5, 0.1]}
        position={[0.25, 0.5, 0]}
        radius={0.05}
        smoothness={4}
        rotation={[0, 0, 10]}
      >
        <meshPhongMaterial attach="material" color={props?.color || 'purple'} />
      </RoundedBox>
      {/* Side fins */}
      <RoundedBox
        ref={leftFinRef}
        args={[0.5, 0.1, 0.6]}
        position={[-0, -0.25, 0.5]}
        radius={0.05}
        smoothness={4}
      >
        <meshPhongMaterial attach="material" color={props?.color || 'purple'} />
      </RoundedBox>
      <RoundedBox
        ref={rightFinRef}
        args={[0.5, 0.1, 0.6]}
        position={[-0, -0.25, -0.5]}
        radius={0.05}
        smoothness={4}
      >
        <meshPhongMaterial attach="material" color={props?.color || 'purple'} />
      </RoundedBox>
      {/* lips */}
      <RoundedBox
        args={[0.1, 0.1, 0.5]}
        position={[1.15, -0.4, 0]}
        radius={0.05}
        smoothness={4}
      >
        <meshPhongMaterial attach="material" color="black" />
      </RoundedBox>
      {/* Eyeball */}
      <EyeBall position={[0.6, 0.1, 0.5]} />
      {/* Tail */}
      <Tail color={props.color} />
    </group>
  );
};

export default Player;
