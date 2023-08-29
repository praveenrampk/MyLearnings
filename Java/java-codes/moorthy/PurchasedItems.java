public class PurchasedItems {
    private int item_id;
    private String item_name;
    private int quantity;
    private int item_price;

    public PurchasedItems(int id,String name,int q,int price){
        this.item_id=id;
        this.item_name=name;
        this.quantity=q;
        this.item_price=price;
    }
    public int getPrice(){
        return this.item_price;
    }
    public int getQuantity(){
        return this.quantity;
    }
    public String getName(){
        return this.item_name;
    }
    public int getId(){
        return this.item_id;
    }
    public int getAmount(){
        return this.quantity*this.item_price;
    }
}
