const majorityElement = (a) => {
  const size = a.length;
  const hashMap = new Map();

  for (let i = 0; i < size; i++) {
    hashMap.set(a[i], (hashMap.get(a[i]) || 0) + 1);
  }
  let maxCount = 0;
  let max = a[0],
    flag = 0;

  const entries = hashMap.entries();


  for (const [key, value] of entries) {
    if (value > maxCount && value > Math.floor(size / 2)) {
      flag = 1;
      maxCount = value;
      max = key;
    }
  }
  if (flag) {
    return max;
  }
  return -1;
};

console.log(majorityElement([0, 1, 2, 4, 5, 6]));
