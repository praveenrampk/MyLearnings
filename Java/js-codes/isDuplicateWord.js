const isContainDuplicateWord = (word) => {
  let newWord = word.substring(1);
  const wordEndIndex = newWord.indexOf(word[0]) + 1;

  const hashMap = new Map();

  for (let i = 0; i < word.length; i += wordEndIndex) {
    const splittedWord = word.slice(i, wordEndIndex + i);
    console.log(splittedWord);

    if (i !== 0 && !hashMap.get(splittedWord)) {
      return false;
    }
    hashMap.set(splittedWord, (hashMap.get(splittedWord) | 0) + 1);
  }

  return true;
};

console.log(isContainDuplicateWord("naveennaveen"));
