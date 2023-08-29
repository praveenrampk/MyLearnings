const priya = num => {
    if (!num) {
        return num;
    }
    console.log(num);
    priya(num - 1);
}

(recursion =_=> {
    priya(5);
})();