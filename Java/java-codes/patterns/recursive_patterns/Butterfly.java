package patterns.recursive_patterns;

public class Butterfly {
    public static void main(String[] args) {
        butterfly(1, 5);
    }

    public static void butterfly(int row, int n) {
        star(row);
        space(n - row);
        star(row);
        System.out.println();

        if (row == n) {
            return;
        }
        butterfly(row + 1, n);

        star(row);
        space(n - row);
        star(row);
        System.out.println();
    }

    public static void star(int n) {
        for (int i = 1; i <= n; i++) {
            if (i == 1 || i == n) {
                System.out.print("*");
            } else {
                System.out.print(" ");
            }
        }
    }

    public static void space(int n) {
        for (int i = 1; i <= n; i++) {
            System.out.print("  ");
        }
    }
}
