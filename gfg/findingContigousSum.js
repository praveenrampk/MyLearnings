const arr = [15, -2, 2, -8, 1, 7, 10, 23];
let curSum = arr[0];
let maxSum = arr[0];

for (let i = 1; i < arr.length; i++) {
  curSum = Math.max(arr[i], curSum + arr[i]);
  maxSum = Math.max(maxSum, curSum);
}
console.log(maxSum);
