const minJumps = (arr) => {
  const n = arr.length;
  let max = arr[0];
  let currInd = 1;
  let jumps = 1;

  if (!arr[0]) {
    return -1;
  }
  for (let i = 1; i < n; i++) {
    console.log('ele: ', arr[i]);
    if (!arr[i]) {
      return -1;
    }
    let subArr = arr.slice(currInd, max + i);
    console.log('subArray: ', subArr);
    let move = Math.max(subArr);
    i = move - 1;
    currInd = move;
    max = arr[currInd];
    ++jumps;
  }

  return jumps;
};

console.log(minJumps([2, 3, 1, 1, 2, 4, 2, 0, 1]));
