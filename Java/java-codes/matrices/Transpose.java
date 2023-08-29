package matrices;

public class Transpose {
    public static void main(String[] args) {
        int[][] A = {
                { 1, 2, 3 },
                { 4, 5, 6 },
                { 7, 8, 9 }
        };

        int n = A.length, m = A[0].length;
        for (int i = 0; i < n / 2; i++) {
            for (int j = i; j < m - 1 - i; j++) {

                // Swap elements of each cycle
                // in clockwise direction
                int temp = A[i][j];
                A[i][j] = A[m - 1 - j][i];
                A[m - 1 - j][i] = A[m - 1 - i][m - 1 - j];
                A[m - 1 - i][m - 1 - j] = A[j][m - 1 - i];
                A[j][m - 1 - i] = temp;
            }
        }
        display(A, n, m);
    }

    public static void display(int A[][], int n, int m) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                System.out.print(A[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println();
    }

    public static void swap(int a[][], int row1, int col1) {
        int temp = a[row1][col1];

        a[row1][col1] = a[col1][row1];
        a[col1][row1] = temp;
    }
}
