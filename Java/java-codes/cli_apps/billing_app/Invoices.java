package cli_apps.billing_app;

import java.util.List;

public class Invoices {
    private List<Item> listOfItems;
    private float subTotal;
    private float tax;

    public Invoices(List<Item> listOfItems, float subTotal) {
        this.listOfItems = listOfItems;
        this.subTotal = subTotal;
        this.tax = 10;
    }

    public List<Item> getListOfItems() {
        return listOfItems;
    }

    public void setListOfItems(List<Item> listOfItems) {
        this.listOfItems = listOfItems;
    }

    public float getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(float subTotal) {
        this.subTotal = subTotal;
    }

    public float getTax() {
        return tax;
    }

    public void setTax(float tax) {
        this.tax = tax;
    }
}
