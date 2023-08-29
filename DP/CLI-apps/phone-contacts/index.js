"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scan = require("prompt-sync")();
var Contact = /** @class */ (function () {
    function Contact(name, phone) {
        this.name = name;
        this.phone = phone;
        this.next = null;
    }
    return Contact;
}());
var Group = /** @class */ (function () {
    function Group() {
        this.head = null;
        this.tail = null;
        this.next = null;
    }
    return Group;
}());
var groupMap = new Map();
var checkIsValidInput = function (name, phone) {
    var group = Array.from(groupMap.entries());
    for (var _i = 0, group_1 = group; _i < group_1.length; _i++) {
        var _a = group_1[_i], _ = _a[0], value = _a[1];
        var check = value.head;
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
var addContact = function () {
    var name = String(scan("Enter your name: "));
    var phone = Number(scan("Enter your phone no: "));
    if (checkIsValidInput(name, phone)) {
        var newContact = new Contact(name, phone);
        var group = groupMap.get(name[0].toUpperCase());
        if (group) {
            group.tail = group.tail.next = newContact;
        }
        else {
            var newGroup = new Group();
            newGroup.head = newGroup.tail = newContact;
            groupMap.set(name[0].toUpperCase(), newGroup);
        }
    }
};
var displayAllContacts = function () {
    // Convert the HashMap to an array of key-value pairs
    var unsortedArray = Array.from(groupMap.entries());
    // Sort the array based on keys in alphabetical order
    var sortedArray = unsortedArray.sort(function (a, b) {
        return b[0].localeCompare(a[0]);
    });
    // Create a new sorted Map from the sorted array
    var sortedMap = new Map(sortedArray);
    var groups = Array.from(sortedMap.entries());
    // Now, sortedMap contains the HashMap sorted in alphabetical order by keys
    for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
        var _a = groups_1[_i], group = _a[0], contacts = _a[1];
        var currentContact = contacts.head;
        console.log("\nGroup: ", group);
        while (currentContact !== null) {
            console.log("\nname: ", currentContact.name, "\nphone no: ", currentContact.phone);
            currentContact = currentContact.next;
        }
    }
};
(function () {
    var choice;
    while (true) {
        console.log("1.Add Contacts\n2.View all contacts\n3.View one contact\n4.Edit contact\n5.Delete contact\n6.Exit\n\n");
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
