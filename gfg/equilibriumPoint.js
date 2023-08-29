const optimizedCode = (a) => {
  const n = a.length;
  let totalSum = a.reduce((sum, num) => sum + num, 0);
  let sum = 0,
    start = 0;

  while (start < n) {
    totalSum -= a[start];
    if (sum === totalSum) return start + 1;
    sum += a[start++];
  }

  return -1;
};
// my logic
const equilibriumPoint = (a) => {
  const n = a.length;
  let start = 0,
    end = n - 1;
  let startSum = a[start];
  let endSum = a[end];

  while (start !== end) {
    if (startSum < endSum) startSum += a[++start];
    else if (startSum > endSum) endSum += a[--end];
    else {
      startSum += a[++start];
      endSum += a[--end];
    }
  }

  return start + 1;
};

console.log("myCode: ", equilibriumPoint([1, 2, 3, 1, 2, 1, 2, 1]));
console.log("optimized: ", optimizedCode([1, 2, 3, 1, 2, 1, 2, 1]));
