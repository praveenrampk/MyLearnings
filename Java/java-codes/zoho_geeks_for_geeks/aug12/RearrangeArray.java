package zoho_geeks_for_geeks.aug12;

public class RearrangeArray {
    public static void rearrangeArray(int[] arr, int n) {
        int maxIndex = n - 1;
        int minIndex = 0;
        int modifier = arr[0];

        for (int i = 0; i < n; i++) {
            if (modifier < arr[i]) {
                modifier = arr[i];
            }
        }
        modifier++;

        for (int i = 0; i < n; i++) {
            if (i % 2 == 0) {
                arr[i] += (arr[maxIndex] % modifier) * modifier;
                maxIndex--;
            } else {
                arr[i] += (arr[minIndex] % modifier) * modifier;
                minIndex++;
            }
            System.out.print(arr[i] + " ");
        }
        System.out.println();

        for (int i = 0; i < n; i++) {
            arr[i] /= modifier;
            System.out.print(arr[i] + " ");
        }
    }

    public static void main(String[] args) {
        int[] arr = { 1, 7, 3, 4, 5, 6 };
        int n = arr.length;

        rearrangeArray(arr, n);

        // for (int num : arr) {
        // System.out.print(num + " ");
        // }
    }
}
