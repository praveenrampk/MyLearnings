#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define MAX 30
#define MIN 10

struct Items
{
    char name[MAX];
    int quantity;
    float rate;
} item[5];

struct Invoices 
{
    char itemName[MAX];
    int quantity;
    char uom[MIN];
    float price, tax;
    float subTotal;
    struct Invoices *next;
};
typedef struct Invoices invoices;

struct Customers 
{
    char customerName[MAX];
    int phone;
    float total;
    int dayCount;
    char date[MAX];
    invoices *head, *tail;
    invoices *collection[100];
    struct Customers *next;

} *head = NULL, *tail = NULL;
typedef struct Customers customer;

void createStore () 
{
    strcpy(item[0].name, "Rice");
    item[0].quantity = 500;
    item[0].rate = 10;

    strcpy(item[1].name, "Wheat");
    item[1].quantity = 500;
    item[1].rate = 20;

    strcpy(item[2].name, "Dhalls");
    item[2].quantity = 500;
    item[2].rate = 30;

    strcpy(item[3].name, "Apple");
    item[3].quantity = 500;
    item[3].rate = 120;

    strcpy(item[4].name, "Orange");
    item[4].quantity = 500;
    item[4].rate = 100;
};

void viewItems ()
{
    printf("\nS.No\tItem Name\tAvailable Quantity\tRate(Rs./-)\n");
    for (int i = 0; i < 5; i++)
    {
        printf("%d\t%s\t\t\t%d\t\t%.2f\n", i + 1, item[i].name, item[i].quantity, item[i].rate);
    }
};

float findPrice (int choice, int count)
{
    return item[choice].rate * count;
};

int selectItem (char *name, int count)
{
    if (!strcmp(name, "Rice"))
    {
        item[0].quantity -= count;
        return 0;
    }
    if (!strcmp(name, "Wheat"))
    {
        item[1].quantity -= count;
        return 1;
    }
    if (!strcmp(name, "Ragi"))
    {
        item[2].quantity -= count;
        return 2;
    }
    if (!strcmp(name, "Dhaals"))
    {
        item[3].quantity -= count;
        return 3;
    }
    if (!strcmp(name, "Apple"))
    {
        item[4].quantity -= count;
        return 4;
    }
}

void getItems (customer *newCustomer) 
{
    int quantity, choice = 1, itemChoice, flag = 0;
    float price, subTotal;
    char itemName[30], temp;
    
    viewItems();
    
    while (choice) 
    {
        printf("\npress 1 for Buy Item      press 2 for exit buy\n\nEnter the Choice: ");
        scanf("%d", &choice);
        switch (choice)
        {
            case 1:
                flag = 1;
                printf("\nEnter the Item Name: ");
                scanf("%c", &temp); 
                scanf("%[^\n]%*c", itemName);
                printf("\nEnter the Quantity: ");
                scanf("%d", &quantity);
                                
                itemChoice = selectItem(itemName, quantity);
                price = findPrice(itemChoice, quantity);
                subTotal += price;
                
                invoices *item = (invoices*) malloc (sizeof(invoices));
                strcpy(item->itemName, itemName);
                item->quantity = quantity;
                strcpy(item->uom, "Kgs");
                item->price = price;
                item->subTotal = subTotal;
                item->tax = 10.0;
                item->next = NULL;
    
                if (newCustomer->head == NULL) 
                {
                    newCustomer->head = newCustomer->tail = item;
                }
                else 
                {
                    newCustomer->tail->next = item;
                    newCustomer->tail = newCustomer->tail->next;
                }                
                break;
            
            case 2:
                if (flag)
                {
                    newCustomer->total = subTotal;
                    newCustomer->collection[newCustomer->dayCount] = newCustomer->head;
                    newCustomer->head = newCustomer->tail = NULL;
                    return;
                }
                return;
        }
    }
}

void buyItems ()
{
    int phone;
    printf("\nEnter your Phone no: ");
    scanf("%d", &phone);

    customer *newCustomer = head;
    while (newCustomer != NULL) 
    {
        if (newCustomer->phone == phone)
        {
            newCustomer->dayCount++;
            getItems(newCustomer);
            return;
        }
        newCustomer = newCustomer->next;
    }
    char name[MAX],temp;
    printf("\nEnter your Name: ");
    scanf("%c", &temp);
    scanf("%[^\n]%*c", name);
    
    newCustomer = (customer*) malloc (sizeof(customer));
    strcpy(newCustomer->customerName, name);
    newCustomer->phone = phone;
    newCustomer->total = 0;
    newCustomer->dayCount = 0;
    strcpy(newCustomer->date, "05/03/2023");
    newCustomer->head = newCustomer->tail = NULL;
    
    getItems(newCustomer);
    
    if (head == NULL) 
    {
        head = tail = newCustomer;
        return;
    }
    tail = tail->next = newCustomer;
    return;
};

void display()
{
    customer *cus = head;
    invoices *items;

    while (cus != NULL)
    {   
        printf("\nCustomer - %s\nPhone - %d\nDate - %s\n\n", cus->customerName, cus->phone, cus->date); 
        for (int i = 0; i <= cus->dayCount; i++) 
        {
            printf("\nDay-%d\n", i + 1);
            printf("%p\n", cus->collection[i]);
            items = cus->collection[i];
            while (items != NULL)
            {
                printf("%s\n%d\n%.2f\n\n", items->itemName, items->quantity, items->price);
                items = items->next;
            }
        }
        printf("\n\n\n");
        cus = cus->next;
    }
}

int main ()
{
    int choice = 1;

    createStore();
    while (1) 
    {
        printf("\n1. Buy New Things     2. View Items in Store      3. View All Customer's Invoice      4. View Specific Invoices       5. Exit\n\nEnter the Choice: ");
        scanf("%d", &choice);
        switch (choice)
        {
        case 1:
            buyItems();
            break;
        
        case 2:
            viewItems();
            break;
        
        case 3:
            display();
            break;
        default:
            break;
        }
    }
    customer *newCustomer = (customer*) malloc (sizeof(customer));
    strcpy(newCustomer->customerName, "Praveen");
    newCustomer->phone = 123;
    newCustomer->dayCount = 0;
    newCustomer->head = newCustomer->tail = NULL;
    newCustomer->collection[newCustomer->dayCount] = newCustomer->head;
}