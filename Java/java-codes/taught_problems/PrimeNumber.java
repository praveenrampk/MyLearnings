package taught_problems;

public class PrimeNumber {
    public static void main(String[] args) {
        String prime[] = { "Not a Prime", "Prime" };
        System.out.println(prime[isPrime(97)]);
    }

    static int isPrime(int num) {
        if (num <= 1) {
            return 0;
        }
        if (num <= 3) {
            return 1;
        }
        if (num % 2 == 0 || num % 3 == 0) {
            return 0;
        }
        for (int i = 5; i * i <= num; i += 6) {
            if (num % i == 0 || num % (i + 2) == 0) {
                return 0;
            }
        }
        return 1;
    }
}
