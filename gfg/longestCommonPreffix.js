const findLongestCommonPreffix = (arr) => {
  const n = arr.length;
  const len = arr.join("").length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[0][i] !== arr[j][i]) {
        if (i) {
          return arr[0].slice(0, i);
        } else {
          return -11;
        }
      }
    }
  }

  return -1;
};

console.log(findLongestCommonPreffix(["abcdefgh", "abcd", "abcefg"]));
