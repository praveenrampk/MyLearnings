package patterns.snake;
import java.util.Scanner;

public class ZikaPattern {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int key = -1;
            int value = 0;

            for (int i = 1; i <= n; i++) {
                space(n - i);
                key *= -1;
                for (int j = 0; j < n; j++) {
                    value += key;
                    System.out.print(value + "   ");
                }
                value += (n + key);
                System.out.println();
            }
        }
    }

    public static void space(int n) {
        for (int i = 0; i < n; i++) {
            System.out.print("    ");
        }
    }
}
