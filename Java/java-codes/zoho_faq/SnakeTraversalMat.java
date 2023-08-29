package zoho_faq;

public class SnakeTraversalMat {
    public static void main(String[] args) {
        int[][] mat = {
                { 1, 2, 3, 4, 5 },
                { 10, 9, 8, 7, 6 },
                { 11, 12, 13, 14, 15 },
                { 20, 19, 18, 17, 16 },
                { 21, 22, 23, 24, 25 },
                { 30, 29, 28, 27, 26 },
        };
        int n = mat.length, m = mat[0].length;
        int i = 0, j = 0;
        int iKey = 0, jKey = 1;

        while (i < n && j < m) {
            System.out.print(mat[i][j] + " ");

            i += iKey;
            j += jKey;

            if (j == m) {
                i++;
                j--;
                jKey *= -1;
            } else if (j == -1) {
                j++;
                jKey *= -1;
                i++;
            }
        }
    }
}
