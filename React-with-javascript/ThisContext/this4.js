const add = (a, b) => a + b;
function add(a, b) {
  return a + b;
}

const person = {
  name: "Alice",
  sayName: function() {
    console.log(this.name);
  }
};

const arrowPerson = {
  name: "Bob",
  sayName: () => {
    console.log(this.name);
  }
};

person.sayName();
arrowPerson.sayName();

function sum() {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}
sum(1, 2, 3);
const arrowSum = () => {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}
arrowSum(1, 2, 3);