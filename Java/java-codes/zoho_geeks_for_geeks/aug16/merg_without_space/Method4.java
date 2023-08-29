package zoho_geeks_for_geeks.aug16.merg_without_space;

public class Method4 {

    public static void merge(long arr1[], long arr2[], int n, int m) {
        long max = Math.max(arr1[n - 1], arr2[m - 1]) + 1;

        int i = 0, j = 0, k = 0;

        while (i < n && j < m) {
            if (k < n) {
                if ((arr1[i] % max) <= (arr2[j] % max)) {
                    arr1[k] = ((arr1[i] % max) * max) + (arr1[k]);
                    i++;
                    k++;
                } else {
                    arr1[k] = ((arr2[j] % max) * max) + arr1[k];
                    j++;
                    k++;
                }
            } else {
                int index = k - n;
                if ((arr1[i] % max) <= (arr2[j] % max)) {
                    arr2[index] = ((arr1[i] % max) * max) + arr2[index];
                    i++;
                    k++;
                } else {
                    arr2[index] = ((arr2[j] % max) * max) + arr2[index];
                    j++;
                    k++;
                }
            }
        }

        while (i < n) {
            if (k < n) {
                arr1[k] = ((arr1[i] % max) * max) + arr1[k];
                i++;
                k++;
            } else {
                int index = k - n;
                arr2[index] = ((arr1[i] % max) * max) + arr2[index];
                i++;
                k++;
            }
        }

        while (j < m) {
            if (k < n) {
                arr1[k] = ((arr2[j] % max) * max) + arr1[k];
                j++;
                k++;
            } else {
                int index = k - n;
                arr2[index] = ((arr2[j] % max) * max) + arr2[index];
                j++;
                k++;
            }
        }

        for (i = 0; i < n; i++) {
            // arr1[i] /= max;
            System.out.print(arr1[i] + " ");
        }
        System.out.println();
        for (i = 0; i < m; i++) {
            // arr2[i] /= max;
            System.out.print(arr2[i] + " ");
        }
    }

    public static void main(String[] args) {
        long[] arr1 = { 2, 4, 5, 8 };
        long[] arr2 = { 1, 3, 7, 9 };
        int n = arr1.length;
        int m = arr2.length;

        merge(arr1, arr2, n, m);
    }
}
