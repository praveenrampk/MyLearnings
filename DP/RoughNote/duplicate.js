function findDuplicate(array) {
  const map = {};

  for (let i = 0; i < array.length; i++) {
    if (map[array[i]]) {
      map[array[i]] = map[array[i]] + 1;
    } else {
      map[array[i]] = 1;
    }
  }

  console.log(map);

  let maxRepeated = map[array[0]];
  let keyNum = array[0];

  for (const key in map) {
    if (map[key] > maxRepeated) {
      maxRepeated = map[key];
      keyNum = key;
    }
  }
  return keyNum;
}

console.log(findDuplicate([1, 2, 2, 2, 2, 4, 1, 3, 2, 1, 8]));
