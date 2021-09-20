/* eslint-disable no-nested-ternary */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  createRef,
} from 'react';
import { useSpring, a } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import playerStore from '../../stores/playerStore';
import { sigmoid, degToRad } from '../helpers';
import Player from './Player';

const Plane = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -20, 0],
    ...props,
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      <shadowMaterial attach="material" color="#171717" />
      <meshStandardMaterial color="#4bb3fd" />
    </mesh>
  );
};

const Scene = props => {
  const [pressingUp, setPressingUp] = useState(false);
  const [pressingDown, setPressingDown] = useState(false);
  const [pressingLeft, setPressingLeft] = useState(false);
  const [pressingRight, setPressingRight] = useState(false);

  console.log('Scene');

  useEffect(() => {
    const keydownHandler = e => {
      if (e.keyCode === 38 || e.keyCode === 87) {
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
      if (e.keyCode === 38 || e.keyCode === 87) {
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
      setPressingUp(true);
    };

    const mouseUpHandler = () => {
      setPressingUp(false);
    };

    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('keyup', keyupHandler);
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
      window.removeEventListener('keyup', keyupHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, []);

  return (
    <>
      <pointLight position={[10, 10, -10]} decay={10} intensity={2} />
      <Physics>
        {/* <Block ref={ref} position={animPosition} /> */}
        <Player
          color="red"
          up={pressingUp}
          down={pressingDown}
          left={pressingLeft}
          right={pressingRight}
        />
        <Plane />
      </Physics>
    </>
  );
};

export default Scene;
