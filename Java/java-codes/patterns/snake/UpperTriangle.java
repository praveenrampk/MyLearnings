package patterns.snake;

import java.util.Scanner;

public class UpperTriangle {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int direction = -1, value = 1;

            for (int i = 1; i <= n; i++) {
                for (int j = 1; j <= i; j++) {
                    System.out.print(value + " ");
                    value += direction;
                }
                if (direction == -1) {
                    --value;
                }
                value = value + i - direction + 1;
                direction *= -1;
                System.out.println();
            }
        }
    }
}
