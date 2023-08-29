package rough;
import java.util.Scanner;

class SortByKthValue {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int[] array = { 5, 3, 2, 7, 6, 0, 9, 1, 4, 12, 1 };
        int k = sc.nextInt();
        int len = array.length - 1;

        for (int i = 0; i <= len; i += k) {
            if (i + k <= len) {
                swap(array, i, i + k - 1);
            } else {
                swap(array, i, len);
            }
        }
        for (int i = 0; i <= len; i++) {
            System.out.print(array[i] + " ");
        }
    }

    static void swap(int arr[], int front, int back) {
        int track = back + front;
        for (int i = front; i <= track / 2; i++) {
            int temp = arr[i];
            arr[i] = arr[track - i];
            arr[track - i] = temp;
        }
    }
}
