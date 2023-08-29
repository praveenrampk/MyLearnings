package patterns;

import java.util.Scanner;

public class RightAngleFullPyramid {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int i = 1, next = 1;

            while (i <= n) {
                int value = 1;
                for (int j = 1; j <= next; j++) {
                    System.out.print(value + " ");

                    if (j - 1 < next / 2) {
                        value++;
                    } else {
                        value--;
                    }
                }
                next += 2;
                i++;
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
