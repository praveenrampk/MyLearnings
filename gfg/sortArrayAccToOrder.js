const sortA1ByA2 = (A1, A2) => {
  const M = A2.length;
  const hashMap = new Map();
  let sorted = new Array();

  for (const value of A1) {
    hashMap.set(value, (hashMap.get(value) || 0) + 1);
  }

  for (let i = 0; i < M; i++) {
    const count = hashMap.get(A2[i]);

    if (count) {
      sorted.push(...Array.from({ length: count }, () => A2[i]));
      hashMap.delete(A2[i]);
    }
  }

  const restElements = Array.from(hashMap).flatMap(([key, value]) =>
    Array.from({ length: value }, () => key)
  );
  console.log("sorted:", sorted);
  console.log("res:", restElements);

  sorted.push(...restElements.sort((a, b) => a - b));

  if (sorted.length) {
    return sorted;
  }

  return A1.sort((a, b) => a - b);
};

console.log(
  sortA1ByA2(
    [
      15, 47, 59, 326, 124, 5, 623, 128, 483, 153, 125, 232, 154, 555, 656, 485,
      659, 32, 125, 326, 324, 96, 565, 154, 112, 32, 85, 563, 32, 481, 32,
    ],
    [20, 47, 20, 5, 125, 154, 555, 32, 324]
  )
);
