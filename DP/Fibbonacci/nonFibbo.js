(main =_=> {

    let a = 0, b = 1, c;
    const num = 30;

    for (let i = 2; i <= num; i++) {
        c = a + b;

        if (b - a > 1) {
            for (let j = a + 1; j < b; j++) {
                if (j > num) {
                    break;
                }
                console.log(j);
            }
        }
        [a, b] = [b, c];
    }
})();