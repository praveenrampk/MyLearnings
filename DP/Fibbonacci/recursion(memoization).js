const findFibbo = (num, dpArray) => {
    if (dpArray[num] !== -1) {
        return dpArray[num];
    } else if (num <= 1) {
        return num;
    }
    return dpArray[num] = findFibbo(num - 1, dpArray) + findFibbo(num - 2, dpArray);
}

const main = () => {
    const num = 6;
    const dpArray = new Array(num + 1).fill(-1);
    console.log(findFibbo(num, dpArray));
};
main();