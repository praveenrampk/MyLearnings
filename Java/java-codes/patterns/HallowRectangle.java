package patterns;
import java.util.Scanner;

public class HallowRectangle {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int size = sc.nextInt();

            for (int i = 0; i < size/2; i++) {
                System.out.print("* ");
                for (int j = 0; j < size - 2; j++) {
                    if (i == 0 || i == (size / 2) - 1) {
                        System.out.print("* ");
                    } else {
                        System.out.print("  ");
                    }
                }
                System.out.println("* ");
            }
        }
    }
}
