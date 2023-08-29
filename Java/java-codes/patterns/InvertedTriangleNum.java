package patterns;

import java.util.Scanner;

public class InvertedTriangleNum {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int value = n * (n + 1) / 2 - (n - 1);

            for (int i = n; i >= 1; i--) {
                for (int j = 1; j <= i; j++) {
                    System.out.print(value++ + " ");
                }
                value -= i - 1 + i;
                System.out.println();
            }
        }
    }
}
