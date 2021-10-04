/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import playerStore from '../../stores/playerStore';

const Scene = props => {
  console.log('Controls');

  useEffect(() => {
    const keydownHandler = e => {
      if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 32) {
        // up
        playerStore.setState({ controls: { up: true } });
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        // left
        playerStore.setState({ controls: { left: true } });
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        // right
        playerStore.setState({ controls: { right: true } });
      } else if (e.keyCode === 40 || e.keyCode === 83) {
        // down
        playerStore.setState({ controls: { down: true } });
      } else if (e.keyCode === 32) {
        // space
      }
    };

    const keyupHandler = e => {
      if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 32) {
        // up
        playerStore.setState({ controls: { up: false } });

        // moveActiveTetromino('up');
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        // left
        playerStore.setState({ controls: { left: false } });
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        // right
        playerStore.setState({ controls: { right: false } });
      } else if (e.keyCode === 40 || e.keyCode === 83) {
        // down
        playerStore.setState({ controls: { down: false } });
      } else if (e.keyCode === 32) {
        // space
      }
    };

    const mouseDownHandler = () => {
      playerStore.setState({ controls: { mouse: true } });
    };

    const mouseUpHandler = () => {
      playerStore.setState({ controls: { mouse: false } });
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

    const mousePositionX = (mouse.x * viewport.width) / 2;
    const mousePositionY = (mouse.y * viewport.height) / 2;

    playerStore.setState({
      mousePosition: [mousePositionX, mousePositionY, 0],
    });
  });

  return null;
};

export default Scene;
