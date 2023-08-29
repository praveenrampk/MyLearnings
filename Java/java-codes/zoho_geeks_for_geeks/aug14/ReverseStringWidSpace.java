package zoho_geeks_for_geeks.aug14;

public class ReverseStringWidSpace {
    static String reverseWithSpacesIntact(String S) {
        char[] array = S.toCharArray();
        int n = array.length;
        int right = n - 1;
        int left = 0;

        while (left < right) {
            if (array[left] == ' ') {
                left++;
            }
            if (array[right] == ' ') {
                right--;
            }
            if (left < right && array[left] != ' ' && array[right] != ' ') {
                swap(array, right--, left++);
            }
        }

        return String.valueOf(array);
    }

    static void swap(char[] array, int l, int r) {
        char temp = array[l];
        array[l] = array[r];
        array[r] = temp;
    }

    public static void main(String[] args) {
        System.out.println(reverseWithSpacesIntact("  xg kn u ff vr j"));
    }
}
