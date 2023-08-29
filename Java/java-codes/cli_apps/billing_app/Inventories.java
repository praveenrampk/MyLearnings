package cli_apps.billing_app;

import java.util.List;

public class Inventories {
    private List<Item> storedItems;

    public List<Item> getStoredItems() {
        return storedItems;
    }

    public void setStoredItems(List<Item> storedItems) {
        this.storedItems = storedItems;
    }
}
