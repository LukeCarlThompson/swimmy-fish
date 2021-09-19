import { useBox } from '@react-three/cannon';

const Cube = props => {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry />
    </mesh>
  );
};

export default Cube;
