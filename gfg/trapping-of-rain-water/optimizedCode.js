const trappingOfRainWater = (waterLevel) => {
  const n = waterLevel.length;
  const leftMax = new Array();
  const rightMax = new Array();
  let traps = 0;

  leftMax[0] = waterLevel[0];
  rightMax[n - 1] = waterLevel[n - 1];

  for (let i = 1, j = n - 2; i < n; i++, j--) {
    leftMax[i] = Math.max(leftMax[i - 1], waterLevel[i]);
    rightMax[j] = Math.max(rightMax[j + 1], waterLevel[j]);
  }

  console.log("left: ", leftMax, "right: ", rightMax);

  for (let i = 0; i < n; i++) {
    traps += Math.min(leftMax[i], rightMax[i]) - waterLevel[i];
  }

  return traps;
};

console.log(trappingOfRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
