/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import worldStore from "../../stores/worldStore";

export const PerformanceControl = (props) => {
  // useEffect(() => {}, []);

  const maxPixels = 1920 * 1080;

  useFrame((state, delta) => {
    const { viewport, size, performance } = state;

    // This adjusts the rendered resolution based on screen size with a max limit of 1920 x 1080 pixels.
    const scenePixels = size.width * size.height;
    const scenePixelRatio = maxPixels / (scenePixels * viewport.initialDpr);
    if (scenePixelRatio < 1) {
      performance.min = scenePixelRatio;
      state.performance.regress();
    }

    // TODO: Create a user control that slides the performance up and down

    // TODO: Find a way to automatically scale the rendered resolution based on a minimum frame rate
  });

  return null;
};
