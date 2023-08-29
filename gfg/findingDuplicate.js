const duplicates = (a) => {
  const n = a.length;
  const map = new Map();
  const duplicate = new Array();
  
  a.forEach((element) => map.set(element, (map.get(element) || 0) + 1));

  const entries = map.entries();
  let flag = 0;

  for (const [key, value] of entries) {
    if (value > 1) {
      flag = 1;
      duplicate.push(key);
    }
  }
  if (flag) {
    return duplicate.sort((a, b) => a - b);
  }
  return -1;
};

console.log(duplicates([2, 1, 0, 0, 3, 1, 2]));
