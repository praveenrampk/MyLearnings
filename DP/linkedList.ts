import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your name: ", (name: string) => {
  console.log(`Hello, ${name}!`);
  rl.close();
});

interface ListType {
  data: string;
  previous: null | Object;
  next: null | Object;
}

class LinkedList implements ListType {
  data: string;
  previous: null | Object;
  next: null | Object;

  constructor(data: string) {
    this.data = data;
    this.previous = null;
    this.next = null;
  }
}

const list = new LinkedList("Praveen");
console.log(list);
