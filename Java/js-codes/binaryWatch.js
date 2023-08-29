/* BINARY WATCH */

let scan = require("prompt-sync")();

/* Our Binary_Watch initially having all are 0s */

let Binary_Watch = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

/* Our Clock Is On Filling */

const Fill_The_Clock = (Numb, col) => {
  for (let row = 3; row >= 0; row--) {
    let rem = Math.floor(Numb % 10);
    Binary_Watch[row][col] = parseInt(rem);
    Numb = Math.floor(Numb / 10);
  }
};

/* Decimal to Binary Conversion Happening */

const Decimal_To_Binary = (Decimal) => {
  if (Decimal) {
    let ttr = "";

    while (Decimal) {
      let data = Math.floor(Decimal % 2);
      ttr += data;
      Decimal = Math.floor(Decimal / 2);
    }

    ttr = ttr.split("").reverse().join("");
    ttr = parseInt(ttr);

    return ttr;
  }

  return Decimal;
};

/* Getting the Converted Decimal values and Going to Fills Our Clock */

const GO_and_Convert_Binary = (Time) => {
  for (let i = 0; i < Time.length; i++) {
    Time[i] = Decimal_To_Binary(Time[i]);
    Fill_The_Clock(Time[i], i);
  }
};

/* Begining of Execution */

console.log("\n");

let Give_time = scan("Enter the Time in this format (hh:mm:ss) : ");

console.log("\n\nTIME ENTERED : " + Give_time);

console.log("\n");

let Time = [],
  one = 0;

for (let i = 0; i < Give_time.length; i++) {
  if (Number.isInteger(parseInt(Give_time[i]))) {
    Time[one++] = parseInt(Give_time[i]);
  }
}

GO_and_Convert_Binary(Time);

/* Finally Printing the Binary Clock */

let ptr = " ";

console.log("Finally Our Clock Shows The Time...!\n");

Binary_Watch[0][0] =
  Binary_Watch[0][2] =
  Binary_Watch[0][4] =
  Binary_Watch[1][0] =
    " ";

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 6; j++) {
    ptr += Binary_Watch[i][j] + "  ";
  }

  console.log(" " + ptr);
  ptr = ptr.slice(ptr.length - 1);
}

console.log("\n");
