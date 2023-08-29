package cli_apps.contacts_app;

import java.util.Scanner;

public class Main {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        do {
            System.out.println("\n1.create contact\n2.view all contacts\n3.exit\n");
            System.out.print("Enter the choice: ");
            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    ManageContacts.createContact();
                    System.out.println("\ncontact created successfully\n");
                    break;
                case 2:
                    ManageContacts.contactsSummary();
                    break;
                case 3:
                    return;
            }
        } while (true);
    }
}
