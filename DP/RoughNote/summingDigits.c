#include <stdio.h>
#include <string.h>


int sumDigitsByModulo (int number) 
{
    int sum = 0;

    do
    {
        if (!number)
        {
            number = sum;
            sum = 0;
        }
        sum += number % 10;
        number /= 10;
    } while (number || sum > 9);
    
    return sum;
}

int sumDigits (int number) 
{
    char numString[10];
    int sum = 0;
    
    sprintf(numString, "%d", number);

    for (int i = 0; i < strlen(numString); i++) 
    {
        sum += numString[i] - '0';
    }

    if (sum > 9) 
    {
        return sumDigits(sum);
    }
    return sum;
}

int main ()
{
    printf("method 1 : %d\n", sumDigits(991820));
    printf("method 2 : %d", sumDigitsByModulo(99182));
}