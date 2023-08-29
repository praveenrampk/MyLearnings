package round_2;

public class ReverseArray {
    public static void main(String[] args) {
        int[] array = { 2, 1, 3, 5, 8, 6, 7, 9 };
        int k = 7, n = array.length;

        for (int i = 0; i < n; i += k) {
            if (i + k < n)
                reverseArray(array, i, i + k - 1);
            else
                reverseArray(array, i, n - 1);
        }

        for (int i = 0; i < n; i++) {
            System.out.print(array[i] + " ");
        }
    }

    public static void reverseArray(int[] array, int front, int back) {
        for (int i = front; i <= (front + back) / 2; i++) {
            int temp = array[i];
            array[i] = array[back + (front - i)];
            array[back + (front - i)] = temp;
        }
    }
}
