const findLcmForNNumbers = (array) => {
  const lcmStack = new Array();

  const pushNumber = (newNumber) => {
    lcmStack.push(newNumber);

    lcmStack.length === 2 &&
      pushNumber(findLcmForTwoNumbers(lcmStack.pop(), lcmStack.pop()));
  };

  const findMaxAndMin = (num1, num2) => {
    return [Math.max(num1, num2), Math.min(num1, num2)];
  };

  const findLcmForTwoNumbers = (num1, num2) => {
    const [max, min] = findMaxAndMin(num1, num2);
    const MAX_INT = Number.MAX_VALUE;
    let lcm = max;

    for (let i = 1; i < MAX_INT; i++) {
      lcm = max * i;

      if (lcm % min === 0) {
        return lcm;
      }
    }
  };

  for (let i = 0; i < array.length; i++) {
    pushNumber(array[i]);
  }

  return lcmStack.pop();
};

console.log(findLcmForNNumbers([2, 17, 190, 4, 12, 13]));
