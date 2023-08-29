const array = [4, 2, 2, 2, 3, 4, 4, 4, 3, 2];
// const array = [1, 7, 4, 3, 4, 8, 7];
const k = 3;
const hashMap = new Map();

for (let i = 0; i < array.length; i++) {
  if (!hashMap.get(array[i])) {
    hashMap.set(array[i], [i]);
  } else {
    hashMap.set(array[i], [...hashMap.get(array[i]), i]);
  }
}

console.log(hashMap);

const entries = hashMap.entries();
let maxNum = Math.max(...array.slice(0, array.length)), flag = 1;

for (const [key, value] of entries) {
  if (value.length >= k && maxNum > key) {
    flag = 0;
    maxNum = key;
  }
}
console.log(flag ? -1 : maxNum);
