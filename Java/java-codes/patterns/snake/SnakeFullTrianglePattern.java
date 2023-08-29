package patterns.snake;

import java.util.Scanner;

public class SnakeFullTrianglePattern {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int order = -1, direction = -1, i = 1;
            int value = 1;

            while (i != 0) {
                for (int j = 1; j <= i; j++) {
                    System.out.print(value + " ");
                    value += direction;
                }
                if (direction == -1) {
                    --value;
                }
                value += i - direction + 1;
                direction *= -1;
                i -= order;
                if (i == n) {
                    order *= -1;
                }
                System.out.println();
            }
        }
    }
}
