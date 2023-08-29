package patterns;

import java.util.Scanner;

public class NormalInvertedNormalFullTriangle {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();

            int key = 1, i = 1;
            int value = 1;
            while (i != 0) {
                for (int j = 1; j <= i; j++) {
                    System.out.print(value++ + " ");
                }
                i += key;
                if (key != 1) {
                    value = value - i * 2 - 1;
                }
                if (i == n) {
                    key *= -1;
                }
                System.out.println();
            }
        }
    }
}
