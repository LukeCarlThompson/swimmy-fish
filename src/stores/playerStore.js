const playerStore = {
  position: [0, 0, 0],
  velocity: [0, 0, 0],
  rotation: [0, 0, 0],
  mousePosition: [0, 0, 0],
  controls: {
    up: false,
    down: false,
    left: false,
    right: false,
    mouse: false,
  },
  isUnderWater: true,
  uuid: '',
  cannonApi: null,
  // velocityUp: () => {
  //   const { velocity, cannonApi } = get();
  //   cannonApi.velocity.set(velocity[0], velocity[1] + 0.2, velocity[2]);
  //   console.log('velocity setting -->', velocity);
  //   // set({ velocity: [velocity[0], velocity[1] + 1, velocity[2]] });
  // },
};

export default playerStore;
