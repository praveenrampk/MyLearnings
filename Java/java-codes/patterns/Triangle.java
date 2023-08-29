package patterns;
import java.util.Scanner;

public class Triangle {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();

            for (int i = 0; i < n; i++) {
                space(n - i);
                for (int j = 0; j <= i; j++) {
                    if (i == 0 || i == n - 1 || j == 0 || j == i) {
                        System.out.print("* ");
                    } else {
                        System.out.print("  ");
                    }
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
