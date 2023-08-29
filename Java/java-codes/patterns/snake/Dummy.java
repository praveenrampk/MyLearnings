package patterns.snake;

public class Dummy {
    public static void print(int row, int n, int incr) {
        int copy = incr;
        for (int i = 1; i <= row; i++) {
            System.out.print(incr++ + " ");
        }
        System.out.println();
        if (row == n) {
            return;
        }
        print(row + 1, n, incr);

        for (int i = 1; i <= row; i++) {
            System.out.print(copy++ + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        print(1, 4, 1);
    }
}
