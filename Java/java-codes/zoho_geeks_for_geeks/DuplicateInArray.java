package zoho_geeks_for_geeks;

public class DuplicateInArray {
    public static void main(String[] args) {
        int[] array = { 2, 3, 0, 1, 2, 3 };
        int num = array[0];

        for (int i = 1; i < array.length; i++) {
            num = num ^ array[i];
            System.out.println(array[i] + ": " + num);
        }

        System.out.println(num);
    }
}
