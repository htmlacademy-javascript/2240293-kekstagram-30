
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createSequenceNumber () {
  const previousValues = [];

  return function () {
    let currentValue = 0;
    if (previousValues.length === 0) {
      currentValue = 1;
    } else {
      currentValue = previousValues.length + 1;
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';
export {getRandomInteger, createSequenceNumber, isEscapeKey};
