const makeList = function (data) {
    this.data = data;
    this.next = null;
}

let head = null, tail = null;

const addList = data => {
    const newData = new makeList(data);
    
    if (!head) {
        head = tail = newData;
        return;
    }
    tail = tail.next = newData;
    return;
}

const displayList =_=> {
    tail = head;

    while (tail) {
        console.log(tail.data);
        tail = tail.next;
    }
}

(main =_=> {

    for (let i = 0; i < 9; i++) {
        addList(i + 1);
    }
    displayList();
})();