"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = require("readline");
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question("Enter your name: ", function (name) {
    console.log("Hello, ".concat(name, "!"));
    rl.close();
});
var LinkedList = /** @class */ (function () {
    function LinkedList(data) {
        this.data = data;
        this.previous = null;
        this.next = null;
    }
    return LinkedList;
}());
var list = new LinkedList("Praveen");
console.log(list);
