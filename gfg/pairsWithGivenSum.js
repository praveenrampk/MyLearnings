const findPairsWithGivenSum = (A, B, X) => {
  const N = A.length;
  const hashMap = new Map();
  const returnArray = new Array();

  for (const value of B) {
    hashMap.set(value, (hashMap.get(value) || 0) + 1);
  }

  const sortedA = A.sort((a, b) => a - b);

  for (let i = 0; i < N; i++) {
    const item = X - sortedA[i];
    if (hashMap.get(item)) {
      returnArray.push([item, X - item]);
    }
  }

  return returnArray;
};

console.log(findPairsWithGivenSum([1, 2, 4, 5, 7], [5, 6, 3, 4, 8], 9));
