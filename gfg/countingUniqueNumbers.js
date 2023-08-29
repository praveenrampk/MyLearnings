(() => {

    const num = [1, 1, 2, 3, 2, 1, 2, 4];
    const numObj = new Object();

    num.forEach((val) => {
        numObj[val] = (numObj[val] || 0) + 1;
    })
    console.log(numObj);
})();