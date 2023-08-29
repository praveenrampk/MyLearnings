package zoho_geeks_for_geeks.aug14;

public class Sort012DecOrder {
    public static void main(String[] args) {
        int[] array012 = { 0, 1, 0, 0, 2, 1, 2, 0, 1 };

        int left = 0;
        int mid = 0;
        int right = array012.length - 1;

        while (mid <= right) {
            switch (array012[mid]) {
                case 0:
                    swap(array012, mid, right--);
                    break;
                case 1:
                    mid++;
                    break;
                case 2:
                    swap(array012, mid++, left++);
                    break;
                default:
                    break;
            }
        }

        for (int i = 0; i < array012.length; i++) {
            System.out.print(array012[i] + " ");
        }
    }

    static void swap(int[] a, int i, int j) {
        int temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
