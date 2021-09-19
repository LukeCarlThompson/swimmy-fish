import { useSpring, a } from '@react-spring/three';
import React, { useState, useRef, useEffect } from 'react';
import { Shadow } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Physics, useBox } from '@react-three/cannon';

const Block = props => {
  // This reference will give us direct access to the THREE.Mesh object
  // const ref = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const spring = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? '#4c061d' : '#e21258',
  });

  const deg2rad = degrees => degrees * (Math.PI / 180);

  const [ref, api] = useBox(() => ({ mass: 1 }));

  useFrame(() => {});

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <a.mesh
      {...props}
      // ref={ref}
      scale={spring.scale}
      onClick={event => setActive(!active)}
      onPointerOver={event => setHover(true)}
      onPointerOut={event => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <a.meshStandardMaterial color={spring.color} />
    </a.mesh>
  );
};

export default Block;
