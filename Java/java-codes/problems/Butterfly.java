package problems;

public class Butterfly {
    public static void main(String[] args) {
        int n = 7;
        int count = 0;

        for (int i = 1; i <= n; i++) {
            count++;
            for (int j = 1; j <= n; j++) {
                if (j == 1 || j == n || i == j || i + j == n + 1) {
                    System.out.print("* ");
                } else if (count > i && j <= n / 2) {
                    System.out.print("* ");
                } else if (i + j > count && count <= n / 2) {
                    // System.out.print("* ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
    }
}
