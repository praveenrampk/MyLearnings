package rough;

class Solution {
    public static void main(String[] args) {
        int[] array = { 0, 1, 2, 1, 0, 1, 0, 0 };
        sort012(array, array.length);
    }

    public static void sort012(int arr[], int n) {
        int low = 0;
        int mid = 0;
        int high = n - 1;

        while (mid <= high) {
            switch (arr[mid]) {
                case 0:
                    swap(arr, mid, low);
                    low++;
                    mid++;
                    break;
                case 1:
                    mid++;
                    break;
                case 2:
                    swap(arr, mid, high);
                    high--;
                    break;
                default:
                    break;
            }
        }
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
    }

    private static void swap(int arr[], int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}