const degToRad = degrees => degrees * (Math.PI / 180);

const radToDeg = radians => radians * (180 / Math.PI);

// Sigmoid function returns an eased number range between -1 and 1 but never over or under
const sigmoid = x => x / (1 + Math.abs(x));

// Removes decimals places but still retiurns a number not a string;
const truncDec = (int, dec = 2) => Number((int).toFixed(dec));

export { sigmoid, degToRad, radToDeg, truncDec };
