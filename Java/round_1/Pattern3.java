import java.util.Scanner;

public class Pattern3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = 1;

        for (int i = 1; i <= n; i++) {
            space(n - i);
            int value = i - 1;
            int key = -1;
            for (int j = 1; j <= k; j++) {
                System.out.print(value + "  ");
                value += key;
                if (value == 0) {
                    key *= -1;
                }
            }
            k += 2;
            System.out.println();
        }
    }

    public static void space(int n) {
        for (int i = 0; i < n; i++) {
            System.out.print("   ");
        }
    }
}
