package zoho_faq;

public class ZicZacTraversal {
    public static void main(String[] args) {
        int[][] mat = {
                { 1, 2, 3, 1 },
                { 4, 5, 6, 0 },
                { 7, 8, 9, 1 },
                { 0, 1, 2, 5 },
                { 3, 4, 5, 3 },
                { 6, 7, 8, 2 },
                { 5, 4, 2, 8 },
        };
        int n = mat.length, m = mat[0].length;
        int i = 0, j = 0;
        int iKey = 0, jKey = 1;

        while (i < n && j < m) {
            System.out.print(mat[i][j] + " ");
            i += iKey;
            j += jKey;
            if (j >= m) {
                i++;
                j -= 2;
                jKey *= -1;
                iKey = 1;
            } else if (j == 0) {
                iKey = 0;
                jKey *= -1;
            }
        }
    }
}
