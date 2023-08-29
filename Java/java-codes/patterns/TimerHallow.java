package patterns;

import java.util.Scanner;

public class TimerHallow {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int i = 1, order = 1;

            while (i != 0) {
                space(i, true);
                for (int j = i; j < n; j++) {
                    if (i == 1 || i == n) {
                        System.out.print("* ");
                    } else {
                        System.out.print("  ");
                    }
                }
                if (i != n) {
                    space(i, true);
                } else {
                    space(i, false);
                }
                i += order;
                if (i == n) {
                    order *= -1;
                }
                System.out.println();
            }
        }
    }

    public static void space(int n, boolean status) {
        for (int i = 1; i <= n; i++) {
            if (!status && i == 1) {
                System.out.print(" ");
            } else if (!status && i == n) {
                System.out.print("*");
            } else if (i == 1 || i == n) {
                System.out.print("*");
            } else {
                System.out.print(" ");
            }
        }
    }
}
