package zoho_faq;

public class MatrixDiagonalTraverse {
    public static void main(String[] args) {
        int[][] mat = {
                { 1, 2, 3, 4, 5 },
                { 5, 4, 3, 2, 1 },
                { 7, 8, 9, 0, 1 },
                { 4, 3, 2, 3, 2 },
                { 1, 2, 3, 4, 5 },
        };
        int n = mat.length;
        int m = mat[0].length;

        int iKey = -1, jKey = 1;
        int i = 0, j = 0;

        while (i < n && j < m) {
            System.out.print(mat[i][j] + " ");
            i += iKey;
            j += jKey;

            if (j >= m) {
                j--;
                i += 2;
                iKey *= -1;
                jKey *= -1;
                System.out.println();
            } else if (i < 0) {
                i++;
                iKey *= -1;
                jKey *= -1;
                System.out.println();
            }
            if (i >= n) {
                i--;
                j += 2;
                iKey *= -1;
                jKey *= -1;
                System.out.println();
            } else if (j < 0) {
                j++;
                iKey *= -1;
                jKey *= -1;
                System.out.println();
            }
        }
    }
}
