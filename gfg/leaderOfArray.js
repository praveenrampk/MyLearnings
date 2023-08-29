const optimizedLeader = (array) => {
  const n = array.length;
  const maxArr = new Array();
  let max = array[n - 1];

  maxArr.push(max);

  for (let i = n - 2; i >= 0; i--) {
    if (max < array[i]) {
      max = array[i];
      maxArr.push(max);
    }
  }
  const maxLen = maxArr.length - 1;
  
  for (let i = 0; i <= Math.floor(maxLen / 2); i++) {
    let temp = maxArr[i];
    maxArr[i] = maxArr[maxLen - i];
    maxArr[maxLen - i] = temp;
  }
  
  return maxArr;
};

const leaders = (array) => {
  const maxArr = new Array(),
    n = array.length;
  let max = array[0],
    maxInd = 0;

  for (let i = 1; i < n - 1; i++) {
    if (max < array[i]) {
      max = array[i];
      maxInd = i;
    }
    if (i === n - 2) {
      maxArr.push(max);
      ++maxInd;
      i = maxInd;
      max = array[maxInd];
    }
  }
  maxArr.push(array[n - 1]);

  return maxArr;
};

console.log(leaders([63, 70, 80, 33, 33, 47, 20]));
