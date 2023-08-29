package zoho_geeks_for_geeks.aug14;

public class CountNumOccuring {
    public static void main(String[] args) {
        int[] array = { 1, 2, 1, 3, 4, 5, 4 };
        int n = array.length;
        int P = 6;

        for (int i = 0; i < n; i++) {
            array[i]--;
        }
        for (int i = 0; i < n; i++) {
            if (array[i] % P < n) {
                array[array[i] % P] += P;
            }
        }
        for (int i = 0; i < n; i++) {
            array[i] /= P;
            System.out.print(array[i] + " ");
        }
    }
}
