import java.util.*;

public class Main {
    static List<Item> item_list = new ArrayList<>();
    static List<Customer> cust_list = new ArrayList<>();
    static List<Bill> bill_list = new ArrayList<>();

    public static Customer findCustomer(int cust_id) {
        Customer temp = null;
        for (Customer c : cust_list) {
            if (c.isCustomer(cust_id)) {
                temp = c;
                break;
            }
        }
        return temp;
    }

    public static Item findItem(int item_id) {
        Item temp = null;
        for (Item c : item_list) {
            if (c.isItem(item_id)) {
                temp = c;
                break;
            }
        }
        return temp;
    }

    public static void display_items() {
        System.out.printf("%-8s%-15s%-15s", "ITEM_ID", "ITEM_NAME", "ITEM_PRICE");
        System.out.println();
        for (Item i : item_list) {
            System.out.printf("%-8s%-15s%-8s", i.getId(), i.getName(), i.getPrice());
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("\n                                          Welcome to Zoho Market\n");
        while (true) {
            System.out.println(
                    "\n1.create customer\n2.Create Item\n3.Create Bill\n4.Bill List \n5.Bill details for a customer\n6.No of bills for a customer \n7.Total Sales amount by a customer\n8.Customer list\n9.Item list\n0.EXIT\n");
            int choice = scan.nextInt();
            switch (choice) {

                case 1:
                    System.out.println("Enter customer name");
                    cust_list.add(new Customer(scan.next()));
                    break;

                case 2:
                    System.out.println("Enter item name");
                    String item_name = scan.next();
                    System.out.println("Enter item price");
                    int item_price = scan.nextInt();
                    item_list.add(new Item(item_name, item_price));
                    break;

                case 3:
                    System.out.println("Enter the customer id");
                    int cust_id = scan.nextInt();
                    Customer temp = findCustomer(cust_id);
                    if (temp == null) {
                        System.out.println("This id not registered yet");
                        break;
                    }
                    if (item_list.size() == 0) {
                        System.out.println("No items available");
                        break;
                    }
                    Bill b = new Bill(temp);
                    System.out.println("Whether the person is known by you? Yes/No");
                    String known = scan.next();
                    int ch = 1;
                    while (ch == 1) {
                        display_items();

                        System.out.println("Enter the item id");
                        int id = scan.nextInt();
                        System.out.println("Enter the quantity");
                        int q = scan.nextInt();
                        int item_new_price;
                        if (known.equals("Yes")) {
                            System.out.println("Enter the price");
                            item_new_price = scan.nextInt();
                        } else
                            item_new_price = findItem(id).getPrice();
                        b.addDetail(new PurchasedItems(id, findItem(id).getName(), q, item_new_price));
                        System.out.println("");
                        System.out.println("Enter 1 to continue to add items\\Enter 0 to stop purchasing");
                        ch = scan.nextInt();
                    }
                    b.calculateBill();
                    bill_list.add(b);
                    findCustomer(cust_id).addBill(b);
                    b.display();
                    break;

                case 4:
                    if (bill_list.size() == 0) {
                        System.out.println("List is Empty");
                    }
                    for (Bill bill : bill_list) {
                        bill.display();
                    }
                    break;

                case 5:
                    System.out.println("Enter the customer ID");
                    Customer c = findCustomer(scan.nextInt());
                    if (c == null) {
                        System.out.println("Invalid customer ID");
                        break;
                    }
                    c.bill_details();
                    break;

                case 6:
                    System.out.println("Enter the customer ID");
                    Customer cc = findCustomer(scan.nextInt());
                    if (cc == null) {
                        System.out.println("Invalid customer ID");
                        break;
                    }
                    System.out.print("No of bills: ");
                    cc.bill_count();
                    cc.bill_details();
                    break;

                case 7:
                    System.out.println("Enter the customer ID");
                    Customer ccc = findCustomer(scan.nextInt());
                    if (ccc == null) {
                        System.out.println("Invalid customer ID");
                        break;
                    }
                    ccc.totalSalesAmount();

                case 8:
                    System.out.printf("%-15s%-15s", "Customer ID", "Customer Name");
                    System.out.println();
                    if (cust_list.size() == 0) {
                        System.out.println("List is Empty");
                    }
                    for (Customer cust : cust_list) {
                        cust.displayDetails();
                    }
                    break;

                case 9:
                    System.out.printf("%-12s%-12s%-12s", "Item ID", "Item Name", "Item Price");
                    System.out.println();
                    if (item_list.size() == 0) {
                        System.out.println("List is Empty");
                    }
                    for (Item i : item_list) {
                        i.displayDetails();
                    }
                    break;

                default:
                    System.exit(0);
                    break;
            }
        }

    }
}