import React, { useRef } from 'react';
import { Effects } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  SSAO,
  BrightnessContrast,
  ChromaticAberration,
  ToneMapping,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import playerStore from '../../stores/playerStore';

const PostProcessing = () => {
  const dofRef = useRef();

  useFrame(state => {
    // const [x, y, z] = playerStore.getState().position;
    // TODO: Find a way to lock focus on the player position
  });

  return (
    <EffectComposer smaa>
      {/* <SSAO
        blendFunction={BlendFunction.MULTIPLY}
        samples={30}
        rings={4}
        radius={5}
        intensity={60}
        luminanceInfluence={0.5}
        distanceThreshold={1}
        bias={0.5}
        color="#000"
      /> */}
      <ToneMapping
        blendFunction={BlendFunction.NORMAL} // blend mode
        adaptive={false} // toggle adaptive luminance map usage
        resolution={256} // texture resolution of the luminance map
        middleGrey={3} // middle grey factor
        maxLuminance={15} // maximum luminance
        averageLuminance={0.1} // average luminance
        adaptationRate={0.5} // luminance adaptation rate
      />

      <BrightnessContrast
        brightness={-0.05} // brightness. min: -1, max: 1
        contrast={-0.07} // contrast: min -1, max: 1
      />
      <Bloom
        intensity={0.75}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.9}
        height={500}
      />
      {/* <ChromaticAberration
        blendFunction={BlendFunction.NORMAL} // blend mode
        offset={[0.001, 0.001]} // color offset
      /> */}
      {/* <Vignette eskil={false} offset={0.01} darkness={0.5} /> */}
      <DepthOfField
        ref={dofRef}
        focusDistance={0.05}
        focalLength={0.3}
        bokehScale={2}
        height={480}
      />
      <Noise opacity={0.15} premultiply blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
};

export default PostProcessing;
