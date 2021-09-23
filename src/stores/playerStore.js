import create from 'zustand';

const playerStore = create(set => ({
  position: [0, 0, 0],
  velocity: [0, 0, 0],
  rotation: [0, 0, 0],
  mousePosition: [0, 0, 0],
}));

export default playerStore;
