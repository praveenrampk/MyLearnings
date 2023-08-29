package zoho_geeks_for_geeks.aug16.merg_without_space;

import java.util.Arrays;

public class Method2 {
    public static void merge(long arr1[], long arr2[], int n, int m) {
        // [3, 4, 6, 9] [0, 2, 5, 7, 8];
        int right = 0;
        int left = n - 1;

        while (left >= 0 && right < m) {
            if (arr1[left] > arr2[right]) {
                swap(arr1, arr2, left, right);
            }
            right++;
            left--;
        }

        Arrays.sort(arr1);
        Arrays.sort(arr2);
    }

    public static void swap(long[] a, long[] b, int i, int j) {
        long temp = a[i];
        a[i] = b[j];
        b[j] = temp;
    }
}
