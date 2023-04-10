//1
// this.func = 'Praveen';
// const test = {
//   prop: 42,
//   func: () => {
//     return this.func;
//   },
// };
// console.log(test.func());

//2
// const test = {
//   prop: 42,
//   func: () => {
//     return this.func;
//   },
// };
// console.log(test.func());

//3
// const test = {
//   prop: 42,
//   func: function () {
//     return this.prop;
//   },
// };
// console.log(test.func());

//4 
this.prop = 'praveen';
const fun1 = function () {
    const fun2 = function () {
        console.log(this.prop);
    }
    fun2();
}
fun1();