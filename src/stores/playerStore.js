import create from 'zustand';

const playerStore = create(set => ({
  position: [0, 0, 0],
  velocity: [0, 0, 0],
  setVelocity: newVelocity => set({ velocity: newVelocity }),
  increaseVelocityUp: () =>
    set(state => ({
      velocity: [state.velocity[0], state.velocity[1] + 1, state.velocity[2]],
    })),
  stopVelocity: () => set({ velocity: [0, 0, 0] }),
}));

export default playerStore;
