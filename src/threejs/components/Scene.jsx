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

const Cube = props => {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));
  // const velocityStore = playerStore(state => state.velocity);
  // const velocityRef = useRef(velocityStore);
  const rotation = useRef([0, 0, 0]);

  console.log('Scene');

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

    props.up && api.velocity.set(0, velocityY + 1, 0);

    props.down && api.velocity.set(0, velocityY - 1, 0);

    api.rotation.set(0, 0, degToRad(sigmoid(velocityY / 10) * 45));
  });

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial color={props?.color || 'purple'} />
    </mesh>
  );
};

const Plane = props => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [4.5, -20.5, 1],
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
  const [position, setPosition] = useState([0, 0, 0]);
  const [pressingUp, setPressingUp] = useState(false);
  const [pressingDown, setPressingDown] = useState(false);

  useEffect(() => {
    const keydownHandler = e => {
      if (e.keyCode === 38 || e.keyCode === 87) {
        // up
        setPressingUp(true);

        // moveActiveTetromino('up');
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        // left
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        // right
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
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        // right
      } else if (e.keyCode === 40 || e.keyCode === 83) {
        // down

        setPressingDown(false);
      } else if (e.keyCode === 32) {
        // space
      }
    };

    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('keyup', keyupHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
      window.removeEventListener('keyup', keyupHandler);
    };
  }, []);

  return (
    <>
      <pointLight position={[10, 10, -10]} decay={10} intensity={2} />

      <Physics>
        {/* <Block ref={ref} position={animPosition} /> */}
        <Cube color="red" up={pressingUp} down={pressingDown} />
        <Plane />
      </Physics>
    </>
  );
};

export default Scene;
