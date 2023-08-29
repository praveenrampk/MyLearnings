#include <stdio.h>
#include <stdlib.h>

struct Nodes 
{
    char letter;
    int count;
    
    struct Nodes *next;
} *head = NULL, *tail = NULL;


void push (char letter) 
{
    struct Nodes *newNode = head;
    
    while(newNode != NULL) 
    {
        if (newNode->letter == letter)
        {
            newNode->count += 1;
            return;
        }
        newNode = newNode->next;
    }
    
    newNode = (struct Nodes*) malloc (sizeof(struct Nodes));
    newNode->letter = letter;
    newNode->count = 1;
    newNode->next = NULL;

    if (!head) 
    {
        head = tail = newNode;
        return;
    }
    tail = tail->next = newNode;
    return;
}

void display ()
{
    tail = head;

    while (tail != NULL) 
    {
        printf("%c - %d\n", tail->letter, tail->count);
        tail = tail->next;
    }
}

void main (void)
{
    char letters[] = "abbcccd";
    
    for (int i = 0; i < strlen(letters); i++)
    {
        push(letters[i]);
    }
    display();
}