package patterns;

import java.util.Scanner;

public class HallowDiamondInscribed {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int order = 1, i = 1;

            while (i != 0) {
                space(n - i + 1);
                for (int j = 1; j < i; j++) {
                    System.out.print("    ");
                }
                space(n - i + 1);
                if (i == n) {
                    order *= -1;
                }
                i += order;
                System.out.println();
            }
        }
    }

    public static void space(int n) {
        for (int i = 0; i < n; i++) {
            System.out.print(" *");
        }
    }
}
