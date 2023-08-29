(() => {

    let a = 0, b = 1, c;

    for (let i = 2; i < 10; i++) {
        c = a + b;
        console.log(c);
        a = b;
        b = c;
    }
})();