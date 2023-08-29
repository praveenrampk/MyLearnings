import { createInterface } from "readline";

export const scanner = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    scanner.question(query, (input) => {
      resolve(input);
    });
  });
};
