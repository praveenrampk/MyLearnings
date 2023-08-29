package cli_apps.contacts_app;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Scanner;

public class ManageContacts {
    static Scanner sc = new Scanner(System.in);
    static HashMap<Character, Groups> contactsMap = new HashMap<>();

    public static void createContact() {
        System.out.print("\nEnter your name: ");
        String name = sc.next();
        System.out.print("\nEnter your phone no: ");
        int phone = sc.nextInt();

        if (isAlreadyExist(name, phone)) {
            createContact();
        } else {
            addNewContact(name, phone);
        }
    }

    public static boolean isAlreadyExist(String name, int phone) {
        if (name.trim().isEmpty()) {
            System.out.println("Name cannot be empty. Please try again.");
            return true;
        }

        if (phone <= 0) {
            System.out.println("Invalid phone number. Please try again.");
            return true;
        }
        for (Character key : contactsMap.keySet()) {
            Groups group = contactsMap.get(key);
            Iterator<User> iterator = group.getContactList().iterator();

            while (iterator.hasNext()) {
                User tail = iterator.next();
                if (tail.getName().equals(name.toLowerCase())) {
                    System.out.println("\nuser name already taken..\nplease try some other name");

                    return true;
                } else if (tail.getPhone() == phone) {
                    System.out.println("\nphone no already exist..!\ntry again with another number\n");

                    return true;
                }
            }
        }
        return false;
    }

    public static void addNewContact(String name, int phone) {
        char groupName = Character.toUpperCase(name.charAt(0));
        User newUser = new User(name, phone);

        if (contactsMap.containsKey(groupName)) {
            Groups group = contactsMap.get(groupName);
            group.getContactList().add(newUser);
        } else {
            Groups newGroup = new Groups(groupName);
            newGroup.setContactList(new LinkedList<User>());
            newGroup.getContactList().add(newUser);
            contactsMap.put(groupName, newGroup);
        }
    }

    public static void contactsSummary() {
        if (contactsMap.size() > 0) {
            System.out.println("\n\t\t    MY CONTACTS");
            System.out.println("\t\t    ~~~~~~~~~~~");

            for (Character key : contactsMap.keySet()) {
                Groups group = contactsMap.get(key);
                Iterator<User> iterator = group.getContactList().iterator();
                int index = 1;

                System.out.println("\tGroup\t\t--\t\t" + key);
                System.out.println("______________________________________________________");
                System.out.println("\tName\t\t\t\tPhone");
                while (iterator.hasNext()) {
                    User tail = iterator.next();
                    System.out.println(index++ + ".\t" + tail.getName() + "\t\t\t\t" + tail.getPhone());
                }
            }

        } else {
            System.out.println("\nNo more contacts here\n");
        }
    }
}
