#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX 30
#define MIN 10
int trainId = 133170;

struct RailwayBooking
{
    char passengerName[MAX];
    int age;
    int passengerId;
    int trainId;
    char prefferedBerth[MIN];
    char berthAllotted[MIN];
    struct RailwayBooking *next;
} *head = NULL, *tail = NULL;

typedef struct RailwayBooking book;

struct MyTrains 
{
    int trainId;
    char from[MAX];
    char to[MAX];
    int berths[3];
    float price;
} train[5];


void hardCodeTrain ()
{
    train[0].trainId = trainId++;
    strcpy(train[0].from, "Chennai Egmore");
    strcpy(train[0].to, "Trichy JN");
    train[0].berths[0] = 1;
    train[0].berths[1] = 1;
    train[0].berths[2] = 1;
    train[0].price = 120;

    train[1].trainId = trainId++;
    strcpy(train[1].from, "Madurai");
    strcpy(train[1].to, "Trichy JN");
    train[1].berths[0] = 1;
    train[1].berths[1] = 1;
    train[1].berths[2] = 1;
    train[1].price = 100;

    train[2].trainId = trainId++;
    strcpy(train[2].from, "Chinna Salem");
    strcpy(train[2].to, "Salem");
    train[2].berths[0] = 1;
    train[2].berths[1] = 1;
    train[2].berths[2] = 1;
    train[2].price = 50;

    train[3].trainId = trainId++;
    strcpy(train[3].from, "Chennai Egmore");
    strcpy(train[3].to, "Chinna Salem");
    train[3].berths[0] = 1;
    train[3].berths[1] = 1;
    train[3].berths[2] = 1;
    train[3].price = 55;

    train[4].trainId = trainId++;
    strcpy(train[4].from, "Erode");
    strcpy(train[4].to, "Coimbatore");
    train[4].berths[0] = 1;
    train[4].berths[1] = 1;
    train[4].berths[2] = 1;
    train[4].price = 150;
}   

int main () 
{
    hardCodeTrain();
    
}