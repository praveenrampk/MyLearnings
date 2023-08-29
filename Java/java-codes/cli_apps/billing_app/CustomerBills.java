package cli_apps.billing_app;

import java.util.List;

public class CustomerBills {
    private String customerName;
    private int phone;
    private List<Invoices> listOfInvoices;
    private float grandTotal;

    public CustomerBills(String customerName, int phone, List<Invoices> listOfInvoices, float grandTotal) {
        this.customerName = customerName;
        this.phone = phone;
        this.listOfInvoices = listOfInvoices;
        this.grandTotal = grandTotal;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public List<Invoices> getListOfInvoices() {
        return listOfInvoices;
    }

    public void setListOfInvoices(List<Invoices> listOfInvoices) {
        this.listOfInvoices = listOfInvoices;
    }

    public float getGrandTotal() {
        return grandTotal;
    }

    public void setGrandTotal(float grandTotal) {
        this.grandTotal = grandTotal;
    }
}
