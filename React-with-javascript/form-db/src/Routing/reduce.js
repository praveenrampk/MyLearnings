const object = [
    {firstName: "Praveen", lastName: "Naveen", age: 21},
    {firstName: "Praveen", lastName: "Kanth", age: 22},
    {firstName: "Naveen", lastName: "Kumar", age: 30},
    {firstName: "Kaveen", lastName: "Kumar", age: 35},
    {firstName: "Naveen", lastName: "Kumar", age: 12},
    {firstName: "Praveen", lastName: "Kumar", age: 17},
];

let myObj = object.reduce((accumulator, current) => {

    if (accumulator[current.firstName]) {
        accumulator[current.firstName].count = ++accumulator[current.firstName].count;
        accumulator[current.firstName].lastName.push(current.lastName);
    }
    else {
        let lastNames = [];
        lastNames.push(current.lastName);
        accumulator[current.firstName] = {
            count: 1,
            lastName: [...lastNames],
        };
    }
    return accumulator;
}, {});
console.log(myObj);