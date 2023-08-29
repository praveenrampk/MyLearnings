package patterns;
import java.util.Scanner;

public class InvertedTriangle {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();

            for (int i = 0; i < n; i++) {
                space(i);
                for (int j = i; j < n; j++) {
                    if (i == 0 || j == i || j == n - 1) {
                        System.out.print("* ");
                    } else {
                        System.out.print("  ");
                    }
                }
                space(i);
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
