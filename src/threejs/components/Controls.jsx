/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import playerStore from "../../stores/playerStore";

const Scene = (props) => {
  useEffect(() => {
    const { controls } = playerStore;

    const keydownHandler = (e) => {
      if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 32) {
        // up
        controls.up = true;
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        // left
        controls.left = true;
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        // right
        controls.right = true;
      } else if (e.keyCode === 40 || e.keyCode === 83) {
        // down
        controls.down = true;
      } else if (e.keyCode === 32) {
        // space
      }
    };

    const keyupHandler = (e) => {
      if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 32) {
        // up
        controls.up = false;
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        // left
        controls.left = false;
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        // right
        controls.right = false;
      } else if (e.keyCode === 40 || e.keyCode === 83) {
        // down
        controls.down = false;
      } else if (e.keyCode === 32) {
        // space
      }
    };

    const mouseDownHandler = () => {
      controls.mouse = true;
    };

    const mouseUpHandler = () => {
      controls.mouse = false;
    };

    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("touchstart", mouseDownHandler);
    window.addEventListener("touchend", mouseUpHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("touchstart", mouseDownHandler);
      window.removeEventListener("touchend", mouseUpHandler);
    };
  }, []);

  useFrame((state, delta) => {
    const { mouse, viewport } = state;

    const mousePositionX = (mouse.x * viewport.width) / 2;
    const mousePositionY = (mouse.y * viewport.height) / 2;

    playerStore.mousePosition = [mousePositionX, mousePositionY, 0];
  });

  return null;
};

export default Scene;
