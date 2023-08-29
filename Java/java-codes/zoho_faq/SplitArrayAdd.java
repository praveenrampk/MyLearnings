package zoho_faq;

public class SplitArrayAdd {
    public static void main(String[] args) {
        int[] array = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        int n = array.length;
        int i = 0, j = (n / 2) + (n % 2);
        int index = 0;

        while (j < n) {
            array[index++] = array[i++] + array[j++];
            if (j == n) {
                n = (n / 2) + (n % 2);
                j = (n / 2) + (n % 2);
                i = 0;
                index = 0;
            }
        }
        System.out.println(array[0]);
    }
}
