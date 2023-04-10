let scan = require('prompt-sync')();
class Node {
    constructor (name, gender) {
        this.name = name;
        this.gender = gender;
        this.dad = null;
        this.mom = null;
        this.sibbling = null;
        this.child = null;
        this.next = null;
    }
}
let head = tail = null, gotMatch = true;

const checkAndReturn = (name, gender) => {
    let newNode = head;

    while (newNode !== null) {
        if (newNode.name === name && newNode.gender === gender) {
            return newNode;
        }
        newNode = newNode.next;
    }
    newNode = new Node(name, gender);
    (head === null)? (head = tail = newNode) : (tail = tail.next = newNode);
    return newNode;
}

const findCousin = (grandParent, selfGender, parentGender) => {
    let parent = grandParent.child;

    while (parent !== null) {
        let current = parent.child;
        if (parent.gender !== parentGender) {

            while (current !== null) {
                if (current.gender !== selfGender) {
                    console.log(current.name);
                    gotMatch = false;
                }
                current = current.sibbling;
            }
        }
        parent = parent.sibbling;
    }
}

const findMatch = name => {
    let tail = head;
    while (tail !== null) {
        if (tail.name === name) {
            if (tail.mom && tail.mom.mom) 
                findCousin(tail.mom.mom, tail.gender, 'female');
            if (tail.dad && tail.dad.dad)
                findCousin(tail.dad.dad, tail.gender, 'Male');
            return;
        }
        tail = tail.next;
    }
    console.log('No Matches found...');
}

const pushEntry = (name, gender, dad, mom) => {
    let newNode = checkAndReturn(name, gender);
    newNode.dad = checkAndReturn(dad, 'Male');
    newNode.mom = checkAndReturn(mom, 'female');

    if (newNode.dad.child === null) {
        newNode.dad.child = newNode.mom.child = newNode;
        newNode.sibbling = null;
        return;
    }
    let appendSibbling = newNode.dad.child;
    while (appendSibbling.sibbling !== null) {
        appendSibbling = appendSibbling.sibbling;
    }
    appendSibbling.sibbling = newNode;
    newNode.sibbling = null;
    return;
}

(driver => {
    pushEntry('Praveen', 'Male', 'Ramar', 'Sumathi');
    pushEntry('Ramar', 'Male', 'Solai', 'Valli');
    pushEntry('Prakash', 'Male', 'Ramar', 'Sumathi');
    pushEntry('Sumathi', 'female', 'Ramu', 'Ponkodi');
    pushEntry('Govind', 'Male', 'Ramu', 'Ponkodi');
    pushEntry('Krish', 'female', 'Govind', 'Sangeetha');
    pushEntry('Kavi', 'female', 'Govind', 'Sangeetha');
    pushEntry('Geetha', 'female', 'Solai', 'Valli');
    pushEntry('Seetha', 'female', 'Satish', 'Geetha');

    let bool = 1, person;
    while (Number(bool)) {
        console.log('press 1 for find match');
        console.log('press 2 for exit');
        bool = scan('Enter the Option: ');
        
        if (Number(bool)) {
            person = scan('Enter the person name: ');
            findMatch(String(person));
        }
        if (!gotMatch) {
            console.log('No Matches found...');
        }
        gotMatch = true;
    }
})();