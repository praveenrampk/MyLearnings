package cli_apps.billing_app;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;

public class ManageBilling {
    static Scanner sc = new Scanner(System.in);
    static Inventories store = new Inventories();
    static HashMap<Integer, CustomerBills> customersMap = new HashMap<>();

    public ManageBilling() {
        loadInventories();
    }

    private static void loadInventories() {
        ArrayList<Item> items = new ArrayList<>();
        items.add(new Item("apple", 200, 100));
        items.add(new Item("orange", 300, 120));
        items.add(new Item("mango", 400, 50));
        items.add(new Item("rice", 200, 10));
        items.add(new Item("wheat", 100, 20));
        store.setStoredItems(items);
    }

    public static void addInventories() {
        ArrayList<Item> alteredItems = new ArrayList<>(store.getStoredItems());
        System.out.print("\nHow many items are you going to add: ");
        int itemCount = sc.nextInt();
        int countItem = 1;

        while (itemCount != 0) {
            System.out.println("\nItem - " + (countItem++));
            System.out.print("\n  Enter the item name: ");
            sc.nextLine();
            String itemName = sc.nextLine();
            System.out.print("  Enter the total quantity: ");
            int quantity = sc.nextInt();
            System.out.print("  Enter the price of Item: ");
            float price = sc.nextFloat();
            alteredItems.add(new Item(itemName, quantity, price));
            System.out.println("\n  Your new Item: " + itemName + ", added successfully in our store\n");
            itemCount--;
        }
        store.setStoredItems(alteredItems);
    }

    public static void displayInventories() {
        System.out.println("\nS.No\tParticulars\tQuantity\tPrice");
        System.out.println("----------------------------------------------");
        int index = 1;
        for (Item item : store.getStoredItems()) {
            String itemName = item.getItemName();
            int quantity = item.getQuantity();
            double price = item.getPrice();

            System.out.println(
                    String.format("%-8d%-17s%-3d%-12s%.1f", index++, itemName, quantity, " kg", price));
        }
    }

    public static void buyItems() {
        System.out.print("\nEnter your mobile no: ");
        int phone = sc.nextInt();

        if (customersMap.containsKey(phone)) {
            CustomerBills oldCustomerBills = customersMap.get(phone);
            ArrayList<Invoices> addListOfInvoices = new ArrayList<>(oldCustomerBills.getListOfInvoices());

            System.out.println("yes");
            Invoices invoice = addItems();

            addListOfInvoices.add(invoice);
            oldCustomerBills.setGrandTotal(invoice.getSubTotal() + oldCustomerBills.getGrandTotal());
            oldCustomerBills.setListOfInvoices(addListOfInvoices);

            customersMap.put(phone, oldCustomerBills);
        } else {
            System.out.print("Enter your name: ");
            sc.nextLine();
            String customerName = sc.nextLine();

            ArrayList<Invoices> listOfInvoices = new ArrayList<>();
            Invoices invoice = addItems();
            listOfInvoices.add(invoice);
            CustomerBills customer = new CustomerBills(customerName, phone, listOfInvoices, invoice.getSubTotal());
            customersMap.put(phone, customer);
        }
    }

    private static Invoices addItems() {
        ArrayList<Item> listOfItems = new ArrayList<>();
        ArrayList<Item> deductItems = new ArrayList<>(store.getStoredItems());
        float subTotal = 0;

        do {
            System.out.println("\n1. Add items\t2.Exit adding");
            System.out.print("\nEnter the choice: ");
            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    displayInventories();
                    int size = store.getStoredItems().size();

                    System.out.print("\nEnter the choice (");
                    for (int i = 0; i < size - 1; i++) {
                        System.out.print((i + 1) + "/");
                    }
                    System.out.print(size + "): ");
                    int itemChoice = sc.nextInt();
                    System.out.print("Enter the quantity: ");
                    int quantity = sc.nextInt();

                    Item storeItem = store.getStoredItems().get(itemChoice - 1);
                    listOfItems.add(new Item(storeItem.getItemName(), quantity, quantity * storeItem.getPrice()));

                    storeItem.setQuantity(storeItem.getQuantity() - quantity);
                    deductItems.set(itemChoice - 1, storeItem);
                    subTotal += (quantity * storeItem.getPrice());
                    System.out.println("price: " + quantity * storeItem.getPrice());
                    break;
                case 2:
                    return new Invoices(listOfItems, subTotal);
                default:
                    System.out.println("Your'e entered wrong input. Try again,...");
                    break;
            }
        } while (true);
    }

    public static void billingSummary() {
        if (customersMap.size() > 0) {
            System.out.println("\nS.No\tCustomer Name\t\tPhone Number\t\tNo of Days visited");
            System.out.println("--------------------------------------------------------------------------");
            int index = 1;
            for (Integer key : customersMap.keySet()) {
                CustomerBills customer = customersMap.get(key);
                System.out.println(
                        String.format("%-8d%-24s%-24d%-1d", index++, customer.getCustomerName(),
                                customer.getPhone(),
                                customer.getListOfInvoices().size()));
            }
        } else {
            System.out.println("\nNo more bills available here,...");
        }
    }

    public static void seeOneCustomerBills(int phone) {
        if (customersMap.containsKey(phone)) {
            CustomerBills customerBills = customersMap.get(phone);
            System.out.println("\nCustomer name: " + customerBills.getCustomerName());
            System.out.println("Customer phone no: " + customerBills.getPhone());
            System.out.println("Totally paid(grand total) : " + customerBills.getGrandTotal());

            int dayCount = 1, itemCount;
            List<Invoices> invoices = customerBills.getListOfInvoices();
            for (Invoices invoice : invoices) {
                System.out.println("\nDay - " + (dayCount++));
                System.out.println("Sub-Total: " + invoice.getSubTotal());

                itemCount = 1;
                List<Item> items = invoice.getListOfItems();
                System.out.println("\nS.No\tParticulars\tQuantity\tPrice");
                System.out.println("----------------------------------------------");
                for (Item item : items) {
                    System.out.println(
                            String.format("%-8d%-17s%-3d%-12s%.1f", itemCount++, item.getItemName(), item.getQuantity(),
                                    " kg", item.getPrice()));
                }
            }
        } else {
            System.out.println("\nCustomer not available with this phone number,...");
        }
    }
}
