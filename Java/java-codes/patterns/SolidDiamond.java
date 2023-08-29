package patterns;

import java.util.Scanner;

public class SolidDiamond {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int i = 1, key = 1;

            while (i != 0) {
                space(n - i);
                for (int j = 0; j < i; j++) {
                    // if (i == 1 || j == 0 || j == i - 1) {
                    // } else {
                    // System.out.print(" ");
                    // }
                    System.out.print(" *");
                }
                i += key;
                if (i == n + 1) {
                    key *= -1;
                    i += key;
                }
                System.out.println();
            }
        }
    }

    public static void space(int n) {
        for (int i = 0; i < n; i++) {
            System.out.print(" ");
        }
    }
}