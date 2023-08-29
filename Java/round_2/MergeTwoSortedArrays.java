package round_2;

public class MergeTwoSortedArrays {
    public static void main(String[] args) {
        int[] arr1 = { 11, 12, 15, 15 };
        int[] arr2 = { 15, 8, 4, 2 };
        int n = arr1.length, m = arr2.length;

        int[] arr3 = new int[n + m];

        int len = arr1.length + arr2.length;
        int gap = (len / 2) + (len % 2);

        while (gap > 0) {
            int left = 0;
            int right = left + gap;

            while (right < len) {
                if (right < n) {
                    swap(arr1, arr1, left, right);
                } else if (left < n && right >= n) {
                    swap(arr1, arr2, left, right - n);
                } else {
                    swap(arr2, arr2, left - n, right - n);
                }
                left++;
                right++;
            }
            if (gap == 1)
                break;
            gap = (gap / 2) + (gap % 2);
        }

        int index = 0;
        arr3[index++] = arr1[0];

        for (int i = 1; i < n; i++) {
            if (arr1[i] != arr1[i - 1])
                arr3[index++] = arr1[i];
        }
        arr3[index++] = arr2[0];

        for (int i = 1; i < m; i++) {
            if (arr2[i] != arr2[i - 1])
                arr3[index++] = arr2[i];
        }

        for (int i = 0; i < index; i++) {
            System.out.print(arr3[i] + " ");
        }
    }

    public static void swap(int[] a, int[] b, int i, int j) {
        if (a[i] > b[j]) {
            int temp = a[i];
            a[i] = b[j];
            b[j] = temp;
        }
    }
}
