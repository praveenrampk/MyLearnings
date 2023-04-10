class Storage {
    constructor (person1, person2, expand) {
        this.person1 = person1;
        this.person2 = person2;
        this.expand = expand
    };
};
class Flames extends Storage {
    constructor (person1, person2, letter, expand) {
        super(person1, person2, expand);
        this.prevNode = null;
        this.letter = letter;
        this.nextNode = null;
    };
} let head = tail = null;

head = tail = new Flames("Praveen", "Priya", "l", "is in Love with");
tail.nextNode = new Flames("Naveen", "Aarthi", "f", "is friend to");
tail = tail.nextNode;
tail.nextNode = new Flames("Kaveen", "Kavi", "k", "kena koothi");
tail = tail.nextNode;

tail = head;
console.log(tail);