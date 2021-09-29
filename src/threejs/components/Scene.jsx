/* eslint-disable no-nested-ternary */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  createRef,
} from 'react';
// import { useSpring, a } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Physics,
  useBox,
  usePlane,
  useSpring,
  useSphere,
} from '@react-three/cannon';
import { Sphere } from '@react-three/drei';
import playerStore from '../../stores/playerStore';
import { sigmoid, degToRad } from '../helpers';
import Player from './Player';
import Ball from './Ball';
import Background from './Background';

const Plane = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -10, 0],
    ...props,
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <shadowMaterial attach="material" color="#171717" />
      <meshStandardMaterial color="#615637" />
    </mesh>
  );
};

const FishBowl = props => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [7, 3, 0],
    linearDamping: 0.9,
    linearFactor: [1, 1, 0],
    args: 3,
    ...props,
  }));

  const materialProps = {
    transparent: true,
    thickness: { value: 5, min: 0, max: 20 },
    roughness: { value: 1, min: 0, max: 1, step: 0.1 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
    ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
    envMapIntensity: { value: 25, min: 0, max: 100, step: 1 },
    color: '#ffffff',
    attenuationTint: '#ffe79e',
    attenuationDistance: { value: 0, min: 0, max: 1 },
  };

  return (
    <group ref={ref}>
      <Sphere position={[0, 0, 0]} args={[3]}>
        <meshPhysicalMaterial {...materialProps} />
        {/* <meshPhongMaterial
          attach="material"
          flatShading={false}
          specular="#eff41c"
          color={props.color || 'purple'}
          translate={[0, 0, 0]}
        /> */}
      </Sphere>
    </group>
  );
};

const Scene = props => {
  const [pressingUp, setPressingUp] = useState(false);
  const [pressingDown, setPressingDown] = useState(false);
  const [pressingLeft, setPressingLeft] = useState(false);
  const [pressingRight, setPressingRight] = useState(false);
  const [applyForce, setApplyForce] = useState(false);
  const mousePositionRef = useRef([0, 0, 0]);
  const [gravity, setGravity] = useState([0, -10, 0]);

  // TODO: consider mooving all these props to the playerSTore to avoid re-renders

  console.log('Scene');

  useEffect(() => {
    const keydownHandler = e => {
      if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 32) {
        // up
        setPressingUp(true);

        // moveActiveTetromino('up');
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        // left
        setPressingLeft(true);
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        // right
        setPressingRight(true);
      } else if (e.keyCode === 40 || e.keyCode === 83) {
        // down
        setPressingDown(true);
      } else if (e.keyCode === 32) {
        // space
      }
    };

    const keyupHandler = e => {
      if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 32) {
        // up
        console.log('up keyup');
        setPressingUp(false);

        // moveActiveTetromino('up');
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        // left
        setPressingLeft(false);
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        // right
        setPressingRight(false);
      } else if (e.keyCode === 40 || e.keyCode === 83) {
        // down
        setPressingDown(false);
      } else if (e.keyCode === 32) {
        // space
      }
    };

    const mouseDownHandler = () => {
      // setPressingUp(true);
      // const [x, y, z] = mousePositionRef.current;
      // playerStore.setState({ velocity: [x, y, z] });

      // console.log('mousePositionRef.current -->', mousePositionRef.current);
      setApplyForce(true);
    };

    const mouseUpHandler = () => {
      // setPressingUp(false);
      setApplyForce(false);
    };

    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('keyup', keyupHandler);
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('touchstart', mouseDownHandler);
    window.addEventListener('touchend', mouseUpHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
      window.removeEventListener('keyup', keyupHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('touchstart', mouseDownHandler);
      window.removeEventListener('touchend', mouseUpHandler);
    };
  }, []);

  useFrame(state => {
    const { mouse, viewport } = state;
    // const [x, y, z] = playerStore.getState().position;
    // const gravityX = x < -10 ? 10 : x > 10 ? -10 : x * -1;
    // const gravityY = y < -10 ? 10 : y > 10 ? -10 : y * -1;
    // const gravityZ = z < -10 ? 10 : z > 10 ? -10 : z * -1;
    // This causes too many rerenders try and find a way around setting state
    // setGravity([gravityX, gravityY, gravityZ]);

    const mousePositionX = (mouse.x * viewport.width) / 2;
    const mousePositionY = (mouse.y * viewport.height) / 2;

    mousePositionRef.current = [mousePositionX, mousePositionY, 0];

    playerStore.setState({
      mousePosition: [mousePositionX, mousePositionY, 0],
    });
  });

  return (
    <>
      <Physics gravity={[0, 0, 0]} tolerance={0.1}>
        <Player
          color="#e65b05"
          up={pressingUp}
          down={pressingDown}
          left={pressingLeft}
          right={pressingRight}
          applyForce={applyForce}
        />
        <Ball position={[5, 0, 0]} size={0.75} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[6, 2, 0]} size={0.2} />
        <Ball position={[6, 2, 0]} size={0.15} />
        <Ball position={[6, 2, 0]} size={0.35} />
        <Ball position={[6, 2, 0]} size={0.25} />
        <Ball position={[-2, -5, 0]} />
        <Ball position={[-3, -3, 0]} size={1.2} />
        <Ball position={[-7, -5, 0]} size={0.8} />
        <Background />
        <Plane />
      </Physics>
    </>
  );
};

export default Scene;
