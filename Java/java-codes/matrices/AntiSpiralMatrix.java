package matrices;

import java.util.ArrayList;
import java.util.List;

public class AntiSpiralMatrix {
    public static List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> ans = new ArrayList<Integer>();

        int left = 0, right = matrix[0].length - 1;
        int top = 0, bottom = matrix.length - 1;

        while (left <= right && top <= bottom) {
            for (int i = top; i <= bottom; i++) {
                ans.add(matrix[i][left]);
            }
            left++;
            for (int i = left; i <= right; i++) {
                ans.add(matrix[bottom][i]);
            }
            bottom--;
            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    ans.add(matrix[i][right]);
                }
                right--;
            }
            if (top <= bottom) {
                for (int i = right; i >= left; i--) {
                    ans.add(matrix[top][i]);
                }
                top++;
            }
        }

        return ans;
    }

    public static void main(String[] args) {
        int a[][] = {
                { 1, 2, 3, 4, 5 },
                { 18, 19, 20, 21, 6 },
                { 17, 28, 29, 22, 7 },
                { 16, 27, 30, 23, 8 },
                { 15, 26, 25, 24, 9 },
                { 14, 13, 12, 11, 10 }
                // { 1, 18, 17, 16, 15, 14 },
                // { 2, 19, 28, 27, 26, 13 },
                // { 3, 20, 29, 30, 25, 12 },
                // { 4, 21, 22, 23, 24, 11 },
                // { 5, 6, 7, 8, 9, 10 },
        };
        List<Integer> list = spiralOrder(a);
        int i = 0;
        for (Integer L : list) {
            System.out.print(L + "\t");
            i++;
            if (i % a[0].length == 0) {
                System.out.println();
            }
        }
    }

}
