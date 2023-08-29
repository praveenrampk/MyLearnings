package zoho_geeks_for_geeks.aug14;

import java.util.Arrays;
import java.util.HashSet;

public class NextGreaterEvenNum {
    public static long getNextEven(String x) {
        long input = Long.parseLong(x);
        char[] arr = x.toCharArray();
        int c = 0;

        for (int i = 0; i < arr.length; i++) {
            int digit = arr[i] - '0';
            if (digit % 2 != 0) {
                c++;
            }
        }

        // for (int i = 0; i < arr.length; i++) {
        // System.out.print(arr[i] + " ");
        // // }
        // if (c != arr.length) {
        // Arrays.sort(arr);
        // String snew = new String(arr);
        // long m = Long.parseLong(snew);

        // while (m != input) {
        // System.out.println("m: " + m);
        // System.out.println("input: " + input);
        // if (m % 2 == 0 && m >= input) {
        // return m;
        // }

        // Arrays.sort(arr);
        // snew = new String(arr);
        // m = Long.parseLong(snew);
        // }

        // if (m == input) {
        // return -1;
        // }
        // } else {
        // return -1;
        // }

        return -1;
    }

    public static void main(String[] args) {
        System.out.println(getNextEven("34722641"));
    }
}
