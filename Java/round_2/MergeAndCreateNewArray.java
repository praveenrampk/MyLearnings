package round_2;

public class MergeAndCreateNewArray {
    public static void main(String[] args) {
        int[] arr1 = { 3, 6, 9, 10 };
        int[] arr2 = { 8, 7, 5 };
        int n = arr1.length, m = arr2.length;
        int i, j;

        int[] arr3 = new int[m + n];
        int index = 0;
        int key = 1;

        if (arr1[0] - arr1[1] < 0) {
            i = 0;
            j = m - 1;
        } else {
            i = n - 1;
            j = 0;
            key *= -1;
        }

        while ((key == -1 && i >= 0 && j < m) || (i < n && j >= 0)) {
            if (arr1[i] > arr2[j]) {
                arr3[index++] = arr2[j];
                j -= key;
            } else if (arr1[i] == arr2[j]) {
                arr3[index++] = arr1[i];
                i += key;
                j -= key;
            } else {
                arr3[index++] = arr1[i];
                i += key;
            }
        }
        while ((key == -1 && i >= 0) || (i < n)) {
            arr3[index++] = arr1[i];
            i += key;
        }
        while ((key == -1 && j < m) || j >= 0) {
            arr3[index++] = arr2[j];
            j -= key;
        }
        for (i = 0; i < index; i++) {
            System.out.print(arr3[i] + " ");
        }
    }
}
