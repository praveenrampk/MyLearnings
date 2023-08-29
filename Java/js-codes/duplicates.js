const findUniqueElement = (elements) => {
  const hashMap = new Map();

  elements.forEach((element) =>
    hashMap.set(element, (hashMap.get(element) | 0) + 1)
  );

  const entries = hashMap.entries();

  for (const [key, value] of entries) {
    if (value === 1) {
      return key;
    }
  }
};

(() => {
  const duplicate = [1, 2, 3, 4, 2, 3, 1, 2];

  console.log(findUniqueElement(duplicate));
})();
