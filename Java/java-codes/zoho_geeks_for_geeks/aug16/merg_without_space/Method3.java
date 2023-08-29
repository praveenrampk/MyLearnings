package zoho_geeks_for_geeks.aug16.merg_without_space;

public class Method3 {
    public static void merge(long arr1[], long arr2[], int n, int m) {
        int right, left;
        int len = n + m;
        int gap = (len / 2) + (len % 2);

        while (gap > 0) {
            System.out.println(gap);
            left = 0;
            right = left + gap;

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
            if (gap == 1) {
                break;
            }
            gap = (gap / 2) + (gap % 2);
        }
    }

    public static void swap(long[] a, long[] b, int i, int j) {
        if (a[i] > b[j]) {
            long temp = a[i];
            a[i] = b[j];
            b[j] = temp;
        }
    }

    public static void main(String[] args) {
        long[] arr1 = { 3, 4, 6, 9 };
        long[] arr2 = { 0, 2, 5, 7, 8 };
        int n = arr1.length;
        int m = arr2.length;

        merge(arr1, arr2, n, m);

        StringBuilder sb = new StringBuilder("");
    }
}
