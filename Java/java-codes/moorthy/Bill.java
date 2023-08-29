import java.util.*;

public class Bill {
    Scanner scan = new Scanner(System.in);
    static int count = 1;

    private int bill_id;
    private Customer cust;
    private int bill_amt = 0;
    private List<PurchasedItems> items_list = new ArrayList<>();

    public Bill(Customer c) {
        this.bill_id = count++;
        this.cust = c;
    }

    public void addDetail(PurchasedItems item) {
        this.items_list.add(item);
    }

    public void calculateBill() {
        for (PurchasedItems p : items_list) {
            bill_amt += p.getPrice() * p.getQuantity();
        }
    }

    public int getBillAmt() {
        return this.bill_amt;
    }

    public void display() {
        System.out.println("                            Zoho Market");
        System.out.println("------------------------------------------------------------------------");
        System.out.printf("%-20s%-20s", "Customer ID", "Customer Name");
        System.out.println("Bill no: " + bill_id);
        System.out.println();
        System.out.printf("%-20s%-20s", cust.getId(), cust.getName());
        System.out.println();
        System.out.println("------------------------------------------------------------------------");
        System.out.println("             Purchased Items");
        System.out.printf("%-10s%-12s%-12s%-15s%-10s", "Item ID", "Item NAME", "Quantity", "PerUnit_Price", "AMOUNT");
        System.out.println();
        for (PurchasedItems p : items_list) {
            System.out.printf("%-10d%-12s%-12d%-15d%-10d", p.getId(), p.getName(), p.getQuantity(), p.getPrice(),
                    p.getAmount());
            System.out.println();
        }
        System.out.println("                                  Total  :      " + bill_amt);
    }
}
