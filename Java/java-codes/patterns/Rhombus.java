package patterns;

import java.util.Scanner;

public class Rhombus {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            for (int i = 1; i <= n; i++) {
                space(n - i);
                for (int j = 1; j <= n; j++) {
                    if (i == 1 || i == n || j == 1 || j == n) {
                        System.out.print("* ");
                    } else {
                        System.out.print("  ");
                    }
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
