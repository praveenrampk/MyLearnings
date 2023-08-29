package cli_apps.billing_app;

public class Item {
    private String itemName;
    private int quantity;
    private String uom;
    private float price;

    public Item(String itemName, int quantity, float price) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.uom = "kg";
        this.price = price;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
