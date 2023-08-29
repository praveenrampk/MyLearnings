package zoho_geeks_for_geeks.aug16;

public class AlternateNumShift {
    public static void main(String[] args) {
        int[] array = { 2, 1, 3, 4, 0 };
        int n = array.length;

        int max = array[0];
        for (int i = 0; i < n; i++) {
            max = Math.max(max, array[i]);
        }
        max++;

        for (int i = 0; i < n; i++) {
            array[i] += (array[array[i]] % max) * max;
        }

        for (int i = 0; i < n; i++) {
            System.out.print(array[i] / max + " ");
        }
    }
}
