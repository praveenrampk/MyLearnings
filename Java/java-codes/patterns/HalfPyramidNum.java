package patterns;

import java.util.Scanner;

public class HalfPyramidNum {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int i = 1, order = 1, order1 = 2, addNext = 1;

            while (i != 0) {
                int value = 1;
                for (int j = 0; j < addNext; j++) {
                    if (i == 0 || j == 0 || j == addNext - 1) {
                        System.out.print("* ");
                    } else {
                        System.out.print(value + " ");
                        if (j < addNext / 2) {
                            value++;
                        } else {
                            value--;
                        }
                    }
                }
                i += order;
                addNext += order1;
                if (i == n + 1) {
                    order *= -1;
                    order1 *= -1;
                }
                System.out.println();
            }
        }
    }
}
