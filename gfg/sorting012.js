const sort012 = (arr) => {
  const hashMap = new Map();

  for (const value of arr) {
    hashMap.set(value, (hashMap.get(value) || 0) + 1);
  }

  let index = 0;

  for (let i = 0; i < 3; i++) {
    const count = hashMap.get(i);

    for (let j = index; j < count + index; j++) {
      arr[j] = i;
    }
    index += count;
  }

  return arr;
};

console.log(sort012([0, 2, 1, 2, 0]));
