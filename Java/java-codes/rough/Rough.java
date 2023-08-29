package rough;

public class Rough {
    public static void main(String[] args) {
        int[][] arr = {
                { 0, 1, 2, 3, 4, 5 },
                { 10, 11, 12, 13, 14, 15 },
                { 20, 21, 22, 23, 24, 25 },
                { 30, 31, 32, 33, 34, 35 },
                { 40, 41, 42, 43, 44, 45 },
                { 50, 51, 52, 53, 54, 55 },
                { 60, 61, 62, 63, 64, 65 },
                // { 1 , 3, 4}
        };
        printer(arr);
    }

    public static void printer(int[][] arr) {
        int m = arr.length;
        int n = arr[0].length;

        int iKey = -1;
        int jKey = 1;

        int i = 0;
        int j = 0;

        while (i < m && j < n) {
            System.out.print(arr[i][j] + " ");
            i += iKey;
            j += jKey;

            if (!(i < m && i >= 0 && j < n && j >= 0)) {
                System.out.println();
                iKey *= -1;
                jKey *= -1;

                if (i == m) {
                    i = m - 1;
                    j = j + 2;
                } else if (j == n) {
                    j = n - 1;
                    i = i + 2;
                } else if (i < 0) {
                    i = 0;
                } else if (j < 0) {
                    j = 0;
                }
            }
        }
    }
}