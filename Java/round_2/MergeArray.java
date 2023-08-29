package round_2;

public class MergeArray {
    public static void main(String[] args) {
        int[] arr1 = { 6, 6, 7, 8, 9, 10, 11, 12 };
        int[] arr2 = { 5, 5, 4, 3, 2, 1 };
        int n = arr1.length, m = arr2.length;

        int[] arr3 = new int[n + m];
        int index = 0;

        if (arr1[0] - arr1[1] > 0)
            reverse(arr1);
        else
            reverse(arr2);

        int i = 0, j = 0;

        arr3[index++] = arr2[j++];
        while (j < m) {
            if (arr3[j - 1] != arr2[j])
                arr3[index++] = arr2[j];
            j++;
        }

        arr3[index++] = arr1[i++];
        while (i < n) {
            if (arr3[i - 1] != arr1[i])
                arr3[index++] = arr1[i];
            i++;
        }

        for (i = 0; i < index; i++) {
            System.out.print(arr3[i] + " ");
        }
    }

    public static void reverse(int[] arr) {
        int n = arr.length - 1;
        for (int i = 0; i <= n / 2; i++) {
            int temp = arr[i];
            arr[i] = arr[n - i];
            arr[n - i] = temp;
        }
    }
}
