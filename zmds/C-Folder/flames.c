#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define MAX 30

struct Flames 
{
    struct Flames *prevNode;
    char letter[2];
    char abbrevation[MAX];
    struct Flames *nextNode;

} *head = NULL, *tail = NULL;
typedef struct Flames flame;

struct Storage 
{
    char person1[MAX];
    char person2[MAX];
    struct Flames *peopleAddress;
    struct Storage *nextAddress;

} *personHead = NULL, *personTail = NULL;
typedef struct Storage store;

void generateFlames () 
{
    char flames[] = "flames";
    char *expand[] = 
    {
        "is Friend to",
        "is in Love with",
        "has more Affection on",
        "is going to Marry",
        "is Enemy to",
        "is Sister/Brother to"
    };

    for (int i = 0; i < 6; i++)
    {
        flame *newNode = (flame*) malloc (sizeof(flame));
        newNode->letter[0] = flames[i];
        strcpy(newNode->abbrevation, expand[i]);
        newNode->prevNode = newNode->nextNode = NULL;

        if (head == NULL) 
        {
            newNode->prevNode = newNode->nextNode = newNode;
            head = tail = newNode;
        }
        else 
        {
            newNode->prevNode = tail;
            newNode->nextNode = tail->nextNode;
            tail->prevNode = newNode;
            tail = tail->nextNode = newNode;
        }
    }
}

void display ()
{
    flame *data = tail = tail->nextNode;
    do
    {
        printf("%s-%s\n", tail->letter, tail->abbrevation);
        tail = tail->nextNode;
    } while(tail != data);
}

int main ()
{
    generateFlames();
    display();
}