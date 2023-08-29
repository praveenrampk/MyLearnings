const twoArrays = (array1, array2) => {
  const objArr2 = new Object();

  array2.forEach((val) => (objArr2[val] = (objArr2[val] || 0) + 1));

  for (let i = 0; i < array1.length; i++) {
    if (!objArr2[array1[i]]) {
      return console.log("Not Equal");
    }
    objArr2[array1[i]] = objArr2[array1[i]] - 1;
  }
  return console.log("Equal");
};

twoArrays([1, 2, 3, 4], [2, 1, 4, 3]);
twoArrays([1, 10, 2, 3, 10, 32], [10, 1, 3, 2, 32, 10]);

/*
const array1 = [1, 2, 3, 5];
const array2 = [2, 3, 5, 10];

const set2 = new Set(array2);

for (let i = 0; i < array1.length; i++) {
    if (!set2.has(array1[i])) {
        console.log(0);
        return;
    }
    set2.delete(array1[i]);
}
console.log(1);
*/
