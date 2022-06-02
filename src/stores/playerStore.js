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
  damping: 0.75,
  uuid: "",
  cannonApi: null,
};

export default playerStore;
