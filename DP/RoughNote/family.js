/* FINDING THE COUSIN'S FROM OUR'S RELATIONS
IF YOU ENTER ONE PERSON NAME, MY CODE WILL TELLS YOUR COUSIN'S FROM YOUR RELATION */

class Family {
    constructor (name, gender) {
        this.name = name;
        this.gender = gender;
        
        this.dad = null; //both points the 
        this.mom = null; // same person
        this.sibbling = null;
        this.child = null;
        this.next = null;
    }
}

let head = null, tail = null;
let gotMatch = 0;


const checkAndReturn = (name, gender) => {
    let ptr = head;

    while (ptr != null) {
        if (ptr.name == name) {
            return ptr;
        }
        ptr = ptr.next;
    }

    ptr = new Family (name, gender) ;
    ptr.mom = ptr.dad = ptr.sibbling = ptr.child = ptr.next = null;
    
    if (head == null) {
        head = tail = ptr;
    }

    else {
        tail = tail.next = ptr;
    }
    return ptr;
}


const pushEntry = (name, gender, mom, dad) => {
    
    let ptr;
    ptr     = checkAndReturn (name, gender);
    ptr.mom = checkAndReturn (mom, "female");
    ptr.dad = checkAndReturn (dad, "male");

    
    //if the parent node child will be null, his child address will be given to that
    if (ptr.mom.child == null) {
        ptr.mom.child = ptr;
        ptr.dad.child = ptr;
        ptr.sibbling = null;
    }

    // remaining childs are pointed to sibblings only
    else {
        let append_sibbling = ptr.mom.child;
        
        while (append_sibbling.sibbling != null) {
            append_sibbling = append_sibbling.sibbling;
        }

        append_sibbling.sibbling = ptr;
        ptr.sibbling = null;
    }
}


//here i recieve grand parent address, with this I will easily find my matches

const findPatner = (grand, gender, self_gen) => {
    let ptr = grand.child;

    while (ptr != null) {
        if (ptr.gender != gender) {
            let current = ptr.child;

            while (current != null) {
                if (current.gender != self_gen) {
                    console.log (current.name);
                    gotMatch = 1;
                }
                current = current.sibbling;
            }
        }
        ptr = ptr.sibbling;
    }
}


const findMatch = (name) => {
    let ptr = head;

    while (ptr != null) {
        if (ptr.name == name) {
            break;
        }
        ptr = ptr.next;
    }

    //going to find cousin's from mother side
    if (ptr.mom && ptr.mom.mom) {
        findPatner (ptr.mom.mom, "female", ptr.gender);
    }

    //going to find cousin's from father side
    if (ptr.dad && ptr.dad.dad) {
        findPatner (ptr.dad.dad, "male", ptr.gender);
    }
}


//here we will the family circle
const display = () => {
    tail = head;

    while (tail != null) {
        console.log ("Name    : " + tail.name);
        console.log ("Gender  : " + tail.gender);
        
        if (tail.mom != null)   console.log ("Mom     : " + tail.mom.name); 
        else    console.log ("Mom     : " +null);
        if (tail.dad != null)   console.log ("Dad     : " + tail.dad.name);   
        else    console.log ("Dad     : " + null);
        
        console.log ("\n\n");

        tail = tail.next;
    }
}


/* these all are one of the family entries, by using this we will find cousin's for any one */

pushEntry ("Praveen", "male", "Sumathi", "Ramar");
pushEntry ("Radhika", "female", "Sumathi", "Ramar");
pushEntry ("Papa", "female", "Krishna Priya", "Praveen");
pushEntry ("Baby", "female", "Radhika", "Sudhan");
pushEntry ("thambi", "male", "Krishna Priya", "Praveen");
pushEntry ("Ramar",   "male", "Valli",   "Solai");
pushEntry ("Ramya",   "female", "Valli", "Solai");
pushEntry ("Sumathi", "female", "Ponkodi", "Ramasamy");
pushEntry ("Govindhan", "male", "Ponkodi", "Ramasamy");
pushEntry ("Geetha", "female", "Ramya", "Karthick");
pushEntry ("Kavi", "female", "Sangeetha", "Govindhan");
pushEntry ("Prem Kumar", "male", "Ponkodi", "Ramasamy");
pushEntry ("Krishna Priya", "female", "Sathya", "Prem Kumar");


console.log ("\n\nYour family Members are Mapped with Each other\n\n");
display ();

console.log ("\n\nYour Matches Are ...");

//here i will given one name to find his cousin's from his circle 
findMatch ("thambi");

if (gotMatch == 0) {
    console.log ("No Matches Found");
}