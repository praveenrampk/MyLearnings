package rough;
import java.util.Scanner;

public class Pattern {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        for (int i = 1; i <= n; i++) {
            int addCount = n;
            int console = i;
            for (int j = i; j <= n; j++) {
                System.out.print(console + "  ");
                console += addCount;
                addCount--;
            }
            System.out.println();
        }
    }
}

// for (int i = 0; i < pattern.length(); i++) {
// for (int j = 0; j < pattern.length(); j++) {
// if (i == j || i + j == pattern.length() - 1) {
// System.out.print(pattern.charAt(j));
// } else {
// System.out.print(" ");
// }
// }
// System.out.println();
// }