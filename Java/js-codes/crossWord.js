let got_match;
let CrossWord = [
  ["P", "S", "U", "W", "H", "A", "T", "S"],
  ["L", "P", "A", "C", "K", "A", "G", "E"],
  ["N", "Y", "O", "L", "R", "D", "V", "L"],
  ["F", "I", "N", "G", "E", "Z", "B", "M"],
  ["I", "R", "E", "H", "Q", "N", "J", "O"],
  ["A", "T", "B", "V", "G", "Y", "E", "S"],
  ["J", "D", "U", "W", "U", "E", "S", "T"],
  ["P", "S", "T", "I", "C", "K", "E", "Y"],
];

const isAvailable = (word, i, j, row, col, pos) => {
  let size = word.length;

  if (pos == size) {
    return true;
  }

  if (i < 0 || j < 0 || i >= row || j >= col) {
    return false;
  } else if (CrossWord[i][j] == word[pos]) {
    let temporary = CrossWord[i][j];
    CrossWord[i][j] = "";

    got_match =
      isAvailable(word, i + 1, j, row, col, pos + 1) ||
      isAvailable(word, i - 1, j, row, col, pos + 1) ||
      isAvailable(word, i, j + 1, row, col, pos + 1) ||
      isAvailable(word, i, j - 1, row, col, pos + 1) ||
      isAvailable(word, i + 1, j - 1, row, col, pos + 1) ||
      isAvailable(word, i - 1, j + 1, row, col, pos + 1) ||
      isAvailable(word, i + 1, j + 1, row, col, pos + 1) ||
      isAvailable(word, i - 1, j - 1, row, col, pos + 1);

    CrossWord[i][j] = temporary;

    return got_match;
  } else {
    return false;
  }
};

const Check_The_Word = (word, row, col) => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (CrossWord[i][j] == word[0]) {
        if (isAvailable(word, i, j, row, col, 0)) {
          return true;
        }
      }
    }
  }
  return false;
};

let words = [
  "nyoneb"
];
let row = (col = 8);
let found = [],
  notFound = [];

for (let k = 0; k < words.length; k++) {
  if (Check_The_Word(words[k].toUpperCase(), row, col)) {
    found.push(words[k]);
  } else {
    notFound.push(words[k]);
  }
}

console.log("\nThe Words Found     -> " + "[" + found + "]");
console.log("\nThe Words Not Found -> " + "[" + notFound + "]");
console.log();
