const reverse = (front, back, array) => {
    for (let i = front; i <= front + Math.floor((back - front) / 2); i++) {
        let temp1 = array[i];
        array[i] = array[back + front - i ];
        array[back + front - i ] = temp1;
    }
    return array;
}

(main =_=> {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 21, 30];
    const k = 6;

    for (let i = 0; i < array.length; i += k) {
        if (array.length - i < k) {
            array = reverse(i, array.length - 1, array);
        } else {
            array = reverse(i, i + k - 1, array);
        }
    }
    console.log('array: ', array);
})();
