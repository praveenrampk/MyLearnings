package recursion_problems;

public class PrimeNumber {
    public static void main(String[] args) {
        int n = 100;

        for (int i = 2; i <= n; i++) {
            int count = 0;
            for (int j = 1; j <= i / 2; j++) {
                if (i % j == 0) {
                    count++;
                }
            }
            if (count == 1) {
                System.out.print(i + " ");
            }
        }
        // System.out.println(prime(1, 0, 4));
    }

    public static int prime(int start, int count, int num) {
        if (num % start == 0) {
            count += 1;
        }
        if (start == num / 2) {
            System.out.println("value " + num / 2);
            return count;
        }
        prime(start + 1, count, num);

        return count;
    }
}
