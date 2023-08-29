package zoho_geeks_for_geeks.aug16.merg_without_space;

public class Method1 {
    public static void merge(long arr1[], long arr2[], int n, int m) {
        long arr3[] = new long[n + m];
        int index = 0;

        int right = 0, left = 0;

        while (left < n && right < m) {
            if (arr1[left] <= arr2[right]) {
                arr3[index++] = arr1[left++];
            } else {
                arr3[index++] = arr2[right++];
            }
        }

        while (left < n) {
            arr3[index++] = arr1[left++];
        }

        while (right < m) {
            arr3[index++] = arr2[right++];
        }

        left = 0;

        for (int i = 0; i < index; i++) {
            if (i < n) {
                arr1[i] = arr3[i];
            } else {
                arr2[left++] = arr3[i];
            }
        }
    }
}
