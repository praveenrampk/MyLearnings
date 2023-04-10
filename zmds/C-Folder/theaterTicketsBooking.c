#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define MAX 30
#define MIN 10

struct MyMovies
{
    char movieName[MAX];
    int seats[16];
    int class[2];
    int screen, time;
    float price;
} movie[3][2];

struct Booking
{
    int bookId;
    char movieName[MAX];
    int seatsAlloted[MIN];
    int tickets;
    char disCoupon[MIN];
    float price;
    struct Booking *next;
} *head = NULL, *tail = NULL;


void hardCodeMovies () 
{
    strcpy(movie[1][0].movieName, "Poniyin Selvan");
    movie[1][0].screen = 1;
    movie[1][0].time = 8;
    movie[1][0].price = 120;

    strcpy(movie[1][1].movieName, "Poniyin Selvan");
    movie[1][1].screen = 1;
    movie[1][1].time = 4;
    movie[1][1].price = 100;

    strcpy(movie[2][0].movieName, "Aayirathil Oruvan - 2");
    movie[2][0].screen = 2;
    movie[2][0].time = 8;
    movie[2][0].price = 150;

    strcpy(movie[2][1].movieName, "Aayirathil Oruvan - 2");
    movie[2][1].screen = 2;
    movie[2][1].time = 4;
    movie[2][1].price = 120;
}
void listMovies (int ith, int jth)
{
    printf("\nMovie Name: %s\tScreen: %d\tTime: %dpm\nSeats available...\n", movie[ith][ith - 1].movieName, movie[ith][jth].screen, movie[ith][jth].time);
    for (int j = 1; j < 16; j++) 
    {
        printf("  ");
        printf("%d ", movie[ith][ith - 1].seats[j]);
        if (j % 5 == 0) 
        {
            printf("\n");
        }
    }
}
void viewMovies ()
{
    listMovies(1, 0);
    listMovies(1, 1);
    listMovies(2, 0);
    listMovies(2, 1);
}
int main ()
{
    hardCodeMovies();
    viewMovies();
}