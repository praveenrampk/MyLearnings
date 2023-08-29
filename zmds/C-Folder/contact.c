#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#define MAX 30
#define MIN 10

struct Person
{
    char name[MAX];
    int phoneNumber;
    char email[MAX];

    struct Person *next;
};
typedef struct Person person;

struct ContactGroups
{
    char groupLetter[2];
    person *personHead, *personTail;
    struct ContactGroups *next;

} *head = NULL, *tail = NULL;

typedef struct ContactGroups contact;

person *initiateContact(char *name, int phoneNumber, char *email)
{
    person *newContact = (person *)malloc(sizeof(person));
    strcpy(newContact->name, name);
    newContact->phoneNumber = phoneNumber;
    newContact->next = NULL;

    return newContact;
}

void createContact()
{
    char name[MAX], email[MAX];
    int phoneNumber;

    printf("\nEnter your name: ");
    scanf("%s", name);
    printf("\nEnter your phone number: ");
    scanf("%d", &phoneNumber);

    contact *group = head;

    while (group != NULL && group->personHead != NULL)
    {
        if (group->groupLetter[0] == toupper(name[0]))
        {
            person *searchContact = group->personHead;
            while (searchContact != NULL)
            {
                if (searchContact->phoneNumber == phoneNumber)
                {
                    printf("\nThis Contact Already Exist..");
                    return;
                }
                searchContact = searchContact->next;
            }

            group->personTail = group->personTail->next = initiateContact(name, phoneNumber, email);

            return;
        }
        group = group->next;
    }

    contact *newGroup = (contact *)malloc(sizeof(contact));
    person *contactGot = initiateContact(name, phoneNumber, email);

    newGroup->groupLetter[0] = toupper(name[0]);

    if (newGroup->personHead == NULL)
    {
        newGroup->personHead = newGroup->personTail = contactGot;
    }
    else
    {
        newGroup->personTail = newGroup->personTail->next = contactGot;
    }

    if (head == NULL)
    {
        head = tail = newGroup;
    }
    else
    {
        tail = tail->next = newGroup;
    }
}

void displayGroups()
{
    tail = head;

    while (tail != NULL)
    {
        printf("\ngroup name: %c\n", tail->groupLetter[0]);

        person *personTail = tail->personHead;
        while (personTail != NULL)
        {
            printf("\nname: %s\nphone number: %d\n", personTail->name, personTail->phoneNumber);
            personTail = personTail->next;
        }
        tail = tail->next;
    }
}

void deleteContact()
{
    contact *group = head;
    char name[10];
    printf("enter the contact name to be deleted:\n");
    scanf("%s", name);
    while (group->groupLetter[0] == toupper(name[0]))
    {
        person *delContact = group->personHead;
    }
}

int main()
{
    int choice;
    while (1)
    {
        printf("\n1.Create Contact\n2.View All Contacts\n3.View One Contact\n4.Edit Contact\n5.Delete Contact\n6.Exit\n");
        printf("\nEnter the Choice: ");
        scanf("%d", &choice);
        switch (choice)
        {
        case 1:
            createContact();
            break;
        case 2:
            displayGroups();
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        default:
            break;
        }
    }

    return 0;
}