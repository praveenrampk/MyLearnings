package patterns;

import java.util.Scanner;

public class InvertedSquare {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int value = n * n - n + 1;

            for (int i = 1; i <= n; i++) {
                for (int j = 1; j <= n; j++) {
                    System.out.print(value++ + "\t");
                } 
                value -= n * 2;
                System.out.println();
            }
        }
    }
}
