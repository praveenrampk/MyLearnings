package patterns;

import java.util.Scanner;

public class Butterfly {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int order = 1, i = 1;

            while (i != 0) {
                space(i);
                for (int j = i; j < n; j++) {
                    System.out.print("  ");
                }
                space(i);
                i += order;
                if (i == n + 1) {
                    order *= -1;
                    i += order;
                }
                System.out.println();
            }
        }
    }

    public static void space(int n) {
        for (int i = 0; i < n; i++) {
            System.out.print("*");
        }
    }
}
