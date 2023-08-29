package patterns.snake;

import java.util.Scanner;

public class LowerTriangle {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int value = n * (n + 1) / 2;
            int key = -1;

            for (int i = 1; i <= n; i++) {
                for (int j = i; j <= n; j++) {
                    System.out.print(value + " ");
                    value += key;
                }

                if (key == -1) {
                    value -= n - i + key;
                } else {
                    value -= n - i + key * 2;
                }
                key *= -1;
                System.out.println();
            }
        }
    }
}
