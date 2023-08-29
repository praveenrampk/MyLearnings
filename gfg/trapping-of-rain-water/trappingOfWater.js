const searchLeft = (walls, index) => {
  return Math.max(...walls.slice(0, index + 1));
};

const searchRight = (walls, index) => {
  return Math.max(...walls.slice(index, walls.length));
};

const trappingOfRainWater = (walls) => {
  const n = walls.length;
  let trapps = 0;
  let leftTrapps, rightTrapps;

  for (let i = 1; i < n; i++) {
    leftTrapps = searchLeft(walls, i);
    rightTrapps = searchRight(walls, i);

    trapps += Math.min(leftTrapps, rightTrapps) - walls[i];
  }

  return trapps;
};

console.log(trappingOfRainWater([6, 9, 9]));

/*
        
        let trapps = 0;
        let leftMax = 0;
        let rightMax = 0;
        let left = 0;
        let right = n - 1;
    
        while (left < right) {
          if (arr[left] < arr[right]) {
            if (arr[left] > leftMax) {
              leftMax = arr[left];
            } else {
              trapps += leftMax - arr[left];
            }
            left++;
          } else {
            if (arr[right] > rightMax) {
              rightMax = arr[right];
            } else {
              trapps += rightMax - arr[right];
            }
            right--;
          }
        }

        return trapps;
        */
