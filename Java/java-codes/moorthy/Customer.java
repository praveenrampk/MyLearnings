import java.util.*;

public class Customer {
    static int count = 1;

    private int cust_id;
    private String cust_name;
    List<Bill> bill_list = new ArrayList<>();

    public Customer(String name) {
        this.cust_id = count++;
        this.cust_name = name;
        System.out.println("\ncustomer id created succesfully\nYour customer id is " + cust_id);
    }

    public boolean isCustomer(int id) {
        return this.cust_id == id;
    }

    public void addBill(Bill b) {
        bill_list.add(b);
    }

    public int getId() {
        return this.cust_id;
    }

    public String getName() {
        return this.cust_name;
    }

    public void bill_details() {
        if (bill_list.size() == 0) {
            System.out.println("No bills are available");
            return;
        }
        for (Bill b : bill_list) {
            b.display();
        }
    }

    public void bill_count() {
        System.out.println(bill_list.size());
    }

    public void totalSalesAmount() {
        int sales = 0;
        for (Bill b : bill_list) {
            sales += b.getBillAmt();
        }
        System.out.println("Total sales amount: " + sales);
    }

    public void displayDetails() {
        System.out.printf("%-15d%-15s", cust_id, cust_name);
        System.out.println();
    }
}
