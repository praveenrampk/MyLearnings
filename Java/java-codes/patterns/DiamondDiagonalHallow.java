package patterns;

import java.util.Scanner;

public class DiamondDiagonalHallow {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int key1 = 1, key2 = 2, i = 1, addNext = 1;

            while (i != 0) {
                space(n - i);
                for (int j = 1; j <= addNext; j++) {
                    if (i == n || j == 1 || j == addNext || j - 1 == addNext / 2) {
                        System.out.print("* ");
                    } else {
                        System.out.print("  ");
                    }
                }
                i += key1;
                addNext += key2;
                if (i == n) {
                    key1 *= -1;
                    key2 *= -1;
                }
                System.out.println("\n");
            }
        }
    }

    public static void space(int n) {
        for (int i = 1; i <= n; i++) {
            System.out.print("  ");
        }
    }
}
