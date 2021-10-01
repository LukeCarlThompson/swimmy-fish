import React from 'react';

const Lighting = () => {
  console.log('lighting');

  return (
    <>
      <ambientLight intensity={0.5} color="#bfefff" />
      <spotLight
        position={[0, 100, -200]}
        angle={0.2}
        intensity={5}
        distance={300}
        decay={1}
        penumbra={1}
        color="#fffb8a"
      />
      <pointLight
        position={[0, 100, -10]}
        decay={10}
        color="#fffb8a"
        intensity={1}
      />
    </>
  );
};

export default Lighting;
