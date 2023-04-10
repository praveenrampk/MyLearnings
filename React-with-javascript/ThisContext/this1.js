const person = {
    name: 'Alice',
    age: 30,

    
    sayHiRegular: function() {
        const sayHiArrow = function() {
            console.log(`Hi, my name is ${this.name}.`);
        };
        return sayHiArrow.call(this);
    }
};

// person.sayHiArrow();
person.sayHiRegular();