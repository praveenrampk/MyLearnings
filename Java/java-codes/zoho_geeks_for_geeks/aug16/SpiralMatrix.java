package zoho_geeks_for_geeks.aug16;

public class SpiralMatrix {
    public static void main(String[] args) {
        int[][] mat = {
                { 1, 2, 3, 4, 5 },
                { 6, 7, 8, 9, 10 },
                { 11, 12, 13, 14, 15 },
                { 16, 17, 18, 19, 20 },
                { 21, 22, 23, 24, 25 },
        };

        int row = mat.length;
        int col = mat[0].length;

        int top = 0, bottom = row - 1;
        int left = 0, right = col - 1;

        while (left <= right && bottom >= top) {
            for (int j = left; j <= right; j++) {
                System.out.print(mat[top][j] + " ");
            }
            System.out.println();
            top++;
            for (int j = top; j <= bottom; j++) {
                System.out.print(mat[j][right] + " ");
            }
            System.out.println();
            right--;
            if (bottom >= top) {
                for (int j = right; j >= left; j--) {
                    System.out.print(mat[bottom][j] + " ");
                }
                bottom--;
                System.out.println();
            }
            if (right >= left) {
                for (int j = bottom; j >= top; j--) {
                    System.out.print(mat[j][left] + " ");
                }
                left++;
                System.out.println();
            }
        }
    }
}
