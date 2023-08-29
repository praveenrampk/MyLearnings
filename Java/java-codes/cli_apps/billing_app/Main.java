package cli_apps.billing_app;

import java.util.Scanner;

public class Main {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        new ManageBilling();

        do {
            System.out.println(
                    "\n1. Buy Items\n2. Overall billing summary\n3. To see One customer's bill\n4. View Inventory\n5. Add items to inventories\n6. Exit\n");
            System.out.print("\nEnter the choice: ");
            int choice = sc.nextInt();
            switch (choice) {
                case 1:
                    ManageBilling.buyItems();
                    break;
                case 2:
                    ManageBilling.billingSummary();
                    break;
                case 3:
                    System.out.print("\nEnter your mobile no: ");
                    ManageBilling.seeOneCustomerBills(sc.nextInt());
                    break;
                case 4:
                    ManageBilling.displayInventories();
                    break;
                case 5:
                    ManageBilling.addInventories();
                    break;
                case 6:
                    System.out.println("\nThank you for visiting our store");
                    return;
                default:
                    break;
            }
        } while (true);
    }
}
