import java.util.Scanner;

public class Pattern4 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        for (int i = 1; i <= n; i++) {
            int count = i;
            for (int j = 1; j <= i; j++) {
                System.out.print(count + " ");
                count += n - j;
            }
            System.out.println();
        }
    }
}
