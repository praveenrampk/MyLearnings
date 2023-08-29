package patterns;

import java.util.Scanner;

public class SolidDiamondNum {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            int i = 1, key1 = 1, key2 = 2, addNext = 1;
            int printCount = 1;

            while (i != 0) {
                for (int j = 0; j < addNext; j++) {
                    if (j % 2 == 0) {
                        System.out.print(printCount);
                        printCount += key1;
                    } else {
                        System.out.print("*");
                    }
                }
                if (i == n) {
                    key1 *= -1;
                    key2 *= -1;
                    printCount -= (i + 1);
                }
                addNext += key2;
                i += key1;
                System.out.println();
            }
        }
    }
}
