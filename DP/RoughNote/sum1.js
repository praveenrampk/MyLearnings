const makeSingleDigit = num => {
    num = eval(String(num).split('').join('+'));
    if (num > 9) {
        return makeSingleDigit(num);
    }
    return num;
}

(main =_=> {
    const array = [1298, 123421, 1235432, 45342, 23453];
    let totalSum = 0;
    for (let i = 0; i < array.length; i++) {
        totalSum += makeSingleDigit(array[i]);
    }
    console.log(makeSingleDigit(totalSum));
})();