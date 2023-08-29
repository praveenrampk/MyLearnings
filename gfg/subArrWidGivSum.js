const array2 = [
  142, 112, 54, 69, 148, 45, 63, 158, 38, 60, 124, 142, 130, 179, 117, 36, 191,
  43, 89, 107, 41, 143, 65, 49, 47, 6, 91, 130, 171, 151, 7, 102, 194, 149, 30,
  24, 85, 155, 157, 41, 167, 177, 132, 109, 145, 40, 27, 124, 138, 139, 119, 83,
  130, 142, 34, 116, 40, 59, 105, 131, 178, 107, 74, 187, 22, 146, 125, 73, 71,
  30, 178, 174, 98, 113,
];

const array1 = [1, 2, 3, 7, 6];
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const findSubArraySum = (array, s) => {
    const n = array.length;
    let sum = 0;
    
    for (let i = 0; i < n; i++) {
      sum = 0;
      for (let j = i; j < n; j++) {
        sum += array[j];
    
        if (sum === s) {
          return [i + 1, j + 1];
        }
        if (sum > s) {
          break;
        }
      }
    }
    return -1;
}

console.log(findSubArraySum(array2, 1213));