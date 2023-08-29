package patterns;
import java.util.Scanner;

public class HallowTriangle {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();

            for (int i = 0; i < n; i++) {
                for (int j = i; j < n; j++) {
                    if (i == 0 || j == i || j == n - 1) {
                        System.out.print("* ");
                    } else {
                        System.out.print("  ");
                    }
                }
                System.out.println();
            }
        }
    }
}

// for (int i = 0; i < n; i++) {
// for (int j = 0; j <= i; j++) {
// if (j == 0 || j == i || i == n - 1) {
// System.out.print("* ");
// } else {
// System.out.print(" ");
// }
// }
// System.out.println();
// }