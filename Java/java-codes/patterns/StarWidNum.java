package patterns;

import java.util.Scanner;

public class StarWidNum {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int next = 1, i = 1;


            while (i <= n) {
                printStar((n * 2) - i - 1);
                for (int j = 1; j <= next; j++) {
                    if (j % 2 == 0) {
                        System.out.print("*");
                    } else {
                        System.out.print(i);
                    }
                }
                printStar((n * 2) - i - 1);
                System.out.println();
                next += 2;
                i++;
            }
        }
    }

    public static void printStar(int n) {
        for (int i = 0; i < n; i++) {
            System.out.print("*");
        }
    }
}
