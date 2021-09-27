import create from 'zustand';

// TODO: Try setting a store for velocity that is capped at maximum values. So we can still use the regular velocity for the swimming motions but cap the player velocity.
const playerStore = create(set => ({
  position: [0, 0, 0],
  velocity: [0, 0, 0],
  rotation: [0, 0, 0],
  mousePosition: [0, 0, 0],
}));

export default playerStore;
