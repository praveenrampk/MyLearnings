const word1 = "Appa".toLowerCase();
const word2 = "Papa".toLowerCase();

if (word1.length !== word2.length) {
  console.log("Not an anagram");
  return;
}
const hashMap = new Map();

for (let i = 0; i < word1.length; i++) {
  hashMap.set(word1[i], (hashMap.get(word1[i]) || 0) + 1);
}

for (let i = 0; i < word2.length; i++) {
  if (!hashMap.get(word2[i])) {
    console.log("Not an anagram");
    return;
  }
  hashMap.set(word2[i], hashMap.get(word2[i]) - 1);
}
console.log("anagram");
hashMap.clear();
return;