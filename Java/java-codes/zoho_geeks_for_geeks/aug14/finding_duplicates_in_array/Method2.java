package zoho_geeks_for_geeks.aug14.finding_duplicates_in_array;

public class Method2 {
    public static void main(String[] args) {
        int[] array = { 4, 2, 4, 2, 3, 0, 3 };
        int n = array.length;

        for (int i = 0; i < n; i++) {
            array[array[i] % n] += n;
        }

        for (int i = 0; i < n; i++) {
            if (array[i] >= n * 2) {
                System.out.print(i + " ");
            }
        }
    }
}
