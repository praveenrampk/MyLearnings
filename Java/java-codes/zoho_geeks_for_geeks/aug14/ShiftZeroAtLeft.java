package zoho_geeks_for_geeks.aug14;

public class ShiftZeroAtLeft {
    public static void main(String[] args) {
        int[] array = { 1, 2, 0, 3, 0, 0, 0, 1 };
        int n = array.length;
        int j = -1;
        boolean isSeenFirstZero = false;

        for (int i = 0; i < n; i++) {
            if (!isSeenFirstZero && array[i] == 0) {
                isSeenFirstZero = true;
                j = i;
            }

            if (array[i] != 0) {
                if (isSeenFirstZero) {
                    swap(array, i, j);
                    j++;
                }
            }
        }
        if (isSeenFirstZero) {
            swap(array, n - 1, j);
        }

        for (int i = 0; i < n; i++) {
            System.out.print(array[i] + " ");
        }
    }

    static void swap(int a[], int i, int j) {
        int temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
