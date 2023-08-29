const detectName = (pressedNumbers) => {
  const charsAtNumber = [
    " ",
    ".",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "wxyz",
  ];

  const hashMap = new Map();
  charsAtNumber.forEach((value, index) => hashMap.set(index, value));
  
  const numString = String(pressedNumbers);
  for (let i = 0; i < numString.length; i++) {
    
  }
};

detectName(1323);
