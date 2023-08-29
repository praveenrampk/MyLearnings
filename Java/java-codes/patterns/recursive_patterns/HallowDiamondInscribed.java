package patterns.recursive_patterns;

public class HallowDiamondInscribed {
    public static void main(String[] args) {
        printDiamond(1, 9);
    }

    public static void printDiamond(int row, int n) {
        star(n - row + 1);
        space(row - 1);
        star(n - row + 1);
        System.out.println();
        if (row == n) {
            return;
        }
        printDiamond(row + 1, n);

        star(n - row + 1);
        space(row - 1);
        star(n - row + 1);
        System.out.println();
    }

    public static void space(int n) {
        for (int i = 1; i <= n; i++) {
            System.out.print("    ");
        }
    }

    public static void star(int n) {
        for (int i = 1; i <= n; i++) {
            System.out.print(" *");
        }
    }
}
