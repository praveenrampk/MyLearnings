package recursion_problems;

import java.util.ArrayList;

public class NPrime {
    public static ArrayList<Integer> sieveOfEratosthenes(int limit) {
        // Create a boolean array "prime[0..limit]" and initialize all entries as true
        boolean[] prime = new boolean[limit + 1];
        for (int i = 0; i <= limit; i++) {
            prime[i] = true;
        }
        prime[0] = prime[1] = false; // 0 and 1 are not prime numbers

        for (int p = 2; p * p <= limit; p++) {
            // If prime[p] is not changed, then it is a prime
            if (prime[p]) {
                // Update all multiples of p
                for (int i = p * p; i <= limit; i += p) {
                    prime[i] = false;
                }
            }
        }

        // Create a list of prime numbers
        ArrayList<Integer> primes = new ArrayList<>();
        for (int i = 2; i <= limit; i++) {
            if (prime[i]) {
                primes.add(i);
            }
        }
        return primes;
    }

    public static void main(String[] args) {
        int n = 100; // Find all prime numbers up to 100
        ArrayList<Integer> primesUpToN = sieveOfEratosthenes(n);
        System.out.println(primesUpToN);
    }
}
