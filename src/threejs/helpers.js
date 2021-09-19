const degToRad = degrees => degrees * (Math.PI / 180);

const sigmoid = x => x / (1 + Math.abs(x));

export { sigmoid, degToRad };
