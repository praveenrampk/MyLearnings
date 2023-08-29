const sort012 = (arr, N) => {
  const hashMap = new Map();

  arr.forEach((value) => hashMap.set(value, (hashMap.get(value) || 0) + 1));
  arr.forEach((value) => hashMap.set(value, (hashMap.get(value) || 0) + 1));

  console.log(hashMap);

  let newArr = new Array();
  const entries = hashMap.entries();

  for (const [key, value] of entries) {
    newArr = newArr.concat(Array(value).fill(key));
  }

  return newArr.sort((a, b) => a - b);
};

console.log(sort012([0, 2, 1, 2, 0], 5));
