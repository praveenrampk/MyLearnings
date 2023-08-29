const shiftZeroAtLast = (elements) => {
  let nonZeroIndex = 0;

  for (let i = 0; i < elements.length; i++) {
    if (elements[i] !== 0) {
      elements[nonZeroIndex++] = elements[i];
    }
  }

  for (let i = nonZeroIndex; i < elements.length; i++) {
    elements[i] = 0;
  }

  return elements;
};

console.log(shiftZeroAtLast([0, 1, 2, 0, 4, 0, 5, 0]));
