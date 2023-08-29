(main2 =_=> {

    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const k = Math.floor(3 % data.length);

    console.log([...data.slice(k)]);
    console.log([...data.slice(0, k)]);

    console.log([...data.slice(k), ...data.slice(0, k)]);
})();