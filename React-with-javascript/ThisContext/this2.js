const sumArrow = (...args) => {
    console.log(arguments);
    return a + b;
};

const sumRegular = function(a, b) {
    console.log(arguments);
    return a + b;
};

sumArrow(1, 2);
sumRegular(1, 2);