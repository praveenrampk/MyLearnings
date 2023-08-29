package zoho_geeks_for_geeks.aug15;

import java.util.ArrayList;
import java.util.Collections;

public class AlternativePrinting {
    public static void main(String[] args) {

        long[] arr = { 7, 1, 2, 3, 4, 5, 6 };
        ArrayList<Long> nums = new ArrayList<>();
        int N = arr.length;
        int max = N - 1;
        int min = 0;

        for (int i = 0; i < N; i++) {
            nums.add(arr[i]);
        }
        Collections.sort(nums);
        for (int i = 0; i < N; i++) {
            arr[i] = nums.get(i);
        }
        nums.clear();
        System.out.println(nums);
        long modifier = arr[N - 1];

        for (int i = 0; i < N; i++) {
            if (i % 2 == 0) {
                arr[i] += (arr[max--] % modifier) * modifier;
            } else {
                arr[i] += (arr[min++] % modifier) * modifier;
            }
        }

        for (int i = 0; i < N; i++) {
            nums.add(arr[i] / modifier);
        }
        System.out.println(nums);
    }
}
