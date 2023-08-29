package rough;

public class ZigZagFashion {
    public static void main(String[] args) {
        int[] array = { 13, 7, 4, 8, 2, 6, 1 };
        zigZag(array, array.length - 1);

        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }

    public static void zigZag(int a[], int n) {
        int i = 0;
        while (i < n) {
            if (i % 2 == 0) {
                if (a[i] > a[i + 1]) {
                    swap(a, i, i + 1);
                }
            } else {
                if (a[i] < a[i + 1]) {
                    swap(a, i, i + 1);
                }
            }
            i++;
        }
    }

    public static void swap(int a[], int x, int y) {
        int temp = a[x];
        a[x] = a[y];
        a[y] = temp;
    }
}
