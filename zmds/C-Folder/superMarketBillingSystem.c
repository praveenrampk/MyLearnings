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

}item[5];

struct Invoices 
{
    struct Items item;
    char date[MAX];
    char uom[MIN];
    float tax;
    float subTotal;
};

struct Customers 
{
    char customerName[MAX];
    int phone;
    int dayCount, itemCount;
    struct Invoices invoices[100][5];
    float total;
    struct Customers *next;

} *head = NULL, *tail = NULL;
typedef struct Customers customers;


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
}

void viewItems ()
{
    printf("\nS.No\tItem Name\tAvailable Quantity\tRate(Rs./-)\n");
    for (int i = 0; i < 5; i++)
    {
        printf("%d\t%s\t\t\t%d\t\t%.2f\n", i + 1, item[i].name, item[i].quantity, item[i].rate);
    }
}

void buyItems () 
{

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
        
        default:
            break;
        }
    }
}