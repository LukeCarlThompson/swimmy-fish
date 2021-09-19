import React from 'react';
import { Effects } from '@react-three/drei';

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

const PostProcessing = () => (
  <EffectComposer>
    <SSAO
      blendFunction={BlendFunction.MULTIPLY}
      samples={30}
      rings={4}
      radius={5}
      intensity={30}
      luminanceInfluence={0.7}
      distanceThreshold={0.9}
      bias={0.5}
      color="#000"
    />
    <ToneMapping
      blendFunction={BlendFunction.NORMAL} // blend mode
      adaptive={false} // toggle adaptive luminance map usage
      resolution={256} // texture resolution of the luminance map
      middleGrey={1} // middle grey factor
      maxLuminance={10} // maximum luminance
      averageLuminance={0.05} // average luminance
      adaptationRate={0.5} // luminance adaptation rate
    />

    {/* <BrightnessContrast
      brightness={-0.1} // brightness. min: -1, max: 1
      contrast={-0.12} // contrast: min -1, max: 1
    /> */}
    <Bloom
      intensity={0.5}
      luminanceThreshold={0.1}
      luminanceSmoothing={1}
      height={800}
    />
    <Bloom
      intensity={0.1}
      luminanceThreshold={0.1}
      luminanceSmoothing={1}
      height={300}
    />
    <ChromaticAberration
      blendFunction={BlendFunction.NORMAL} // blend mode
      offset={[0.0005, 0.0005]} // color offset
    />
    {/* <Vignette eskil={false} offset={0.01} darkness={0.5} /> */}
    <DepthOfField
      focusDistance={0.17}
      focalLength={0.3}
      bokehScale={3}
      height={480}
    />
    <Noise opacity={0.1} premultiply blendFunction={BlendFunction.NORMAL} />
  </EffectComposer>
);

export default PostProcessing;
