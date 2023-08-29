import { ContactProps, Grouping } from "./interfaces";

const scan = require("prompt-sync")();

class Contact implements ContactProps {
  name: string;
  phone: number;
  next: null | ContactProps;
  constructor(name: string, phone: number) {
    this.name = name;
    this.phone = phone;
    this.next = null;
  }
}

class Group implements Grouping {
  head: ContactProps | null;
  tail: ContactProps | null;
  next: ContactProps | null;
  constructor() {
    this.head = null;
    this.tail = null;
    this.next = null;
  }
}

const groupMap = new Map<string, Grouping>();

const checkIsValidInput = (name: string, phone: number): boolean => {
  const group = Array.from(groupMap.entries());
  for (const [_, value] of group) {
    let check: ContactProps | null = value.head;
    while (check !== null) {
      if (check.phone === phone || check.name === name) {
        console.log("\nDuplicate details detected (name or phone)");
        return false;
      }
      check = check.next;
    }
  }
  return true;
};

const addContact = () => {
  const name: string = String(scan("Enter your name: "));
  const phone: number = Number(scan("Enter your phone no: "));

  if (checkIsValidInput(name, phone)) {
    const newContact: ContactProps = new Contact(name, phone);
    const group = groupMap.get(name[0].toUpperCase());
    if (group) {
      group.tail = group.tail!.next = newContact;
    } else {
      const newGroup = new Group();
      newGroup.head = newGroup.tail = newContact;
      groupMap.set(name[0].toUpperCase(), newGroup);
    }
  }
};

const displayAllContacts = () => {
  
  // Convert the HashMap to an array of key-value pairs
  const unsortedArray: [string, Grouping][] = Array.from(
    groupMap.entries()
  );

  // Sort the array based on keys in alphabetical order
  const sortedArray: [string, Grouping][] = unsortedArray.sort((a, b) =>
    b[0].(a[0])
  );

  // Create a new sorted Map from the sorted array
  const sortedMap: Map<string, Grouping> = new Map(sortedArray);
  
  const groups = Array.from(sortedMap.entries());

  // Now, sortedMap contains the HashMap sorted in alphabetical order by keys

  for (const [group, contacts] of groups) {
    let currentContact = contacts.head;
    console.log("\nGroup: ", group);

    while (currentContact !== null) {
      console.log(
        "\nname: ",
        currentContact.name,
        "\nphone no: ",
        currentContact.phone
      );
      currentContact = currentContact.next;
    }
  }
};

(() => {
  let choice: number;
  while (true) {
    console.log(
      "1.Add Contacts\n2.View all contacts\n3.View one contact\n4.Edit contact\n5.Delete contact\n6.Exit\n\n"
    );
    choice = Number(scan("Enter the choice: "));

    switch (choice) {
      case 1:
        addContact();
        break;
      case 2:
        displayAllContacts();
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        return;
      default:
        break;
    }
  }
})();
