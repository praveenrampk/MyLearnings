import { createInterface } from "readline";

const scanner = createInterface({
  input: process.stdin,
  output: process.stdout,
});

class LinkedList {
  letter: string;
  count: number;
  next: LinkedList | null;

  constructor(letter: string) {
    this.letter = letter;
    this.count = 1;
    this.next = null;
  }
}

class Main {
  head: LinkedList | null;
  tail: LinkedList | null;
  hashMap: Map<string, LinkedList>;

  constructor() {
    this.head = null;
    this.tail = null;
    this.hashMap = new Map<string, LinkedList>();
    this.main();
  }

  main = async () => {
    const input: string = await this.question("Enter the number: ");
    const myNumber: number = parseInt(input);
    const secondNumber: number = Number(await this.question("Enter the second Number: "));
    console.log("You Entered: ", myNumber);
    console.log("Second Number: ", secondNumber);
    scanner.close();
  };

  question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      scanner.question(query, (input) => {
        resolve(input);
      });
    });
  };
}

new Main();
