const repeatedCharacters = (word) => {
  const n = word.length;
  const hashMap = new Map();

  for (const value of word) {
    const key = hashMap.get(value);

    if (key > 0) {
      return value;
    }
    hashMap.set(value, (key || 0) + 1);
  }

  return -1;
};

console.log(repeatedCharacters("evjxpnqgmvfjl"));
