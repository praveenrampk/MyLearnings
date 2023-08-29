const isAnagram = (a, b) => {
  const word1 = a.toLowerCase();
  const word2 = b.toLowerCase();

  const len1 = a.length;
  const len2 = b.length;

  if (len1 !== len2) {
    return "NO";
  }

  const hashMap = new Map();

  for (let i = 0; i < len2; i++) {
    hashMap.set(word1[i], (hashMap.get(word1[i]) || 0) + 1);
  }

  for (let i = 0; i < len1; i++) {
    if (!hashMap.get(word2[i])) {
      return "NO";
    }
    hashMap.set(word2[i], hashMap.get(word2[i]) - 1);
  }
  hashMap.clear();

  return "YES";
};

console.log(isAnagram("b", "d"));
