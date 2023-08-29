package zoho_geeks_for_geeks.aug16;

public class RotatingMatrix {
    public static void main(String[] args) {
        int[][] mat = {
                { 1, 2, 3 },
                { 4, 5, 6 },
                { 7, 8, 9 },
        };

        int row = mat.length;
        int col = mat[0].length;

        transpose(mat, row, col);

        for (int i = 0; i < row; i++) {
            reverse(mat, i, col);
        }
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                System.out.print(mat[i][j] + " ");
            }
            System.out.println();
        }
    }

    static void transpose(int[][] mat, int row, int col) {
        System.out.println("col: " + col);
        for (int i = 0; i < row - 1; i++) {
            for (int j = i + 1; j < col; j++) {
                int temp = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = temp;
            }
        }
    }

    static void reverse(int[][] mat, int row, int col) {
        for (int i = 0; i < col / 2; i++) {
            int temp = mat[row][i];
            mat[row][i] = mat[row][col - 1 - i];
            mat[row][col - 1 - i] = temp;
        }
    }
}
