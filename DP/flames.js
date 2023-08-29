class Flames {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}
let head = null;
let tail = null;

const neglectCommonChars = (person1, person2) => {
  let countChars = 0;

  person1 = person1.replace(/\s/g, "");
  person2 = person2.replace(/\s/g, "");

  person1 = [...person1.split('')];
  person2 = [...person2.split('')];

  for (let i = 0; i < person1.length; i++) {
    if (person2.includes(person1[i])) {
      countChars += 2;
      person1[i] = "";
      person2.
    }
  }

  console.log(person1, person2);
};

(mainFunction = () => {
  const person1 = "Praveen kumar";
  const person2 = "Srimathi";

  neglectCommonChars(person1, person2);

  console.log(person1, person2);
})();
