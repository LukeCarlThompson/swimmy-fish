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
import { Physics, useBox, usePlane, useSpring } from '@react-three/cannon';
import playerStore from '../../stores/playerStore';
import { sigmoid, degToRad } from '../helpers';
import Player from './Player';

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

const Scene = props => {
  const [pressingUp, setPressingUp] = useState(false);
  const [pressingDown, setPressingDown] = useState(false);
  const [pressingLeft, setPressingLeft] = useState(false);
  const [pressingRight, setPressingRight] = useState(false);
  const [applyForce, setApplyForce] = useState(false);
  const mousePositionRef = useRef([0, 0, 0]);
  const [gravity, setGravity] = useState([0, -10, 0]);

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

  //   useFrame(({ mouse: { x, y }, viewport: { height, width } }) =>
  //   position.set((x * width) / 2, (y * height) / 2, 0),
  // )

  useFrame(state => {
    const { mouse, viewport } = state;
    const [x, y, z] = playerStore.getState().position;
    const gravityX = x < -10 ? 10 : x > 10 ? -10 : x * -1;
    const gravityY = y < -10 ? 10 : y > 10 ? -10 : y * -1;
    const gravityZ = z < -10 ? 10 : z > 10 ? -10 : z * -1;
    // This causes too many rerenders try and find a way around setting state
    // setGravity([gravityX, gravityY, gravityZ]);

    const mousePositionX = (mouse.x * viewport.width) / 2;
    const mousePositionY = (mouse.y * viewport.height) / 2;

    mousePositionRef.current = [mousePositionX, mousePositionY, 0];

    playerStore.setState({
      mousePosition: [mousePositionX, mousePositionY, 0],
    });

    // console.log('[gravityX, gravityY, gravityZ]', [
    //   gravityX,
    //   gravityY,
    //   gravityZ,
    // ]);
  });

  return (
    <>
      <pointLight position={[10, 10, -10]} decay={10} intensity={2} />
      {/* <Physics gravity={gravity} tolerance={0.1}> */}
      <Physics gravity={[0, 0, 0]} tolerance={0.1}>
        {/* <Block ref={ref} position={animPosition} /> */}
        <Player
          color="red"
          up={pressingUp}
          down={pressingDown}
          left={pressingLeft}
          right={pressingRight}
          applyForce={applyForce}
        />
        <Plane />
      </Physics>
    </>
  );
};

export default Scene;
