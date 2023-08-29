public class Item {
    static int count=1;
    private int item_id;
    private String item_name;
    private int item_price;

    public Item(String name,int price){
        item_name=name;
        item_price=price;
        item_id=count++;
        System.out.println("Item added to the list");
    }

    public void display_items(){
        System.out.printf("%-8s%-15s%-8s","ITEM_ID","ITEM_NAME","ITEM_PRICE");
        System.out.println();
    }
    public boolean isItem(int id){
        return this.item_id==id;
    }
    public int getId(){
        return this.item_id;
    }
    public String getName(){
        return this.item_name;
    }
    public int getPrice(){
        return this.item_price;
    }
    public void displayDetails(){
        System.out.printf("%-10d%-10s%-10d",item_id,item_name,item_price);
        System.out.println();
    }

}
