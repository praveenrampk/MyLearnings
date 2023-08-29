package zoho_geeks_for_geeks.aug14;

public class FindingDuplicatesInArray {
    public static void main(String[] args) {
        int[] dupArray = { 1, 2, 3, 2, 1 };
        int n = dupArray.length;

        for (int i = 0; i < n; i++) {
            dupArray[i] *= n;
        }

        for (int i = 0; i < n; i++) {
            dupArray[dupArray[i] / n]++;
        }

        for (int i = 0; i < n; i++) {
            if (dupArray[i] % n > 1) {
                System.out.print(i + " ");
            }
        }
    }
}
