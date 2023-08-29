package patterns;

import java.util.Scanner;

public class SolidHalfDiamond {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int i = 1, key = 1;

            while (i != 0) {
                for (int j = 0; j < i; j++) {
                    System.out.print("*");
                }
                i += key;
                if (i == n) {
                    key *= -1;
                }
                System.out.println();
            }
        }
    }
}
