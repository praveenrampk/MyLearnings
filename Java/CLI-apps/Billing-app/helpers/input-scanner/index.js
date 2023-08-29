"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.question = exports.scanner = void 0;
var readline_1 = require("readline");
exports.scanner = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
var question = function (query) {
    return new Promise(function (resolve) {
        exports.scanner.question(query, function (input) {
            resolve(input);
        });
    });
};
exports.question = question;
