const PersonArrow = (name, age) => {
    this.name = name;
    this.age = age;
};

const PersonRegular = function(name, age) {
    this.name = name;
    this.age = age;
};

const aliceArrow = new PersonArrow('Alice', 30); 
const aliceRegular = new PersonRegular('Alice', 30);
