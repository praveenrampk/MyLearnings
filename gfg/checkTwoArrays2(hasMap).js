const array1 = [11, 2, 5, 1, 3, 5];
const array2 = [2, 1, 3, 5, 5, 11];

const hashMap = new Map();

for (let i = 0; i < array1.length; i++) {
  hashMap.set(array1[i], (hashMap.get(array1[i]) || 0) + 1);
}

for (let i = 0; i < array2.length; i++) {
  if (!hashMap.get(array2[i])) {
    console.log("Not Equal");
    return;
  }
  hashMap.set(array2[i], hashMap.get(array2[i]) - 1);
}
console.log("Equal");

//setting items to map (map.set("key", "value"))
hashMap.set("key", "value");

// delete key-value pair using key in map
hashMap.delete(1);
console.log(hashMap);

//create entries
const entries = hashMap.entries();

for (const [key, value] of entries) {
  console.log(key, value);
}