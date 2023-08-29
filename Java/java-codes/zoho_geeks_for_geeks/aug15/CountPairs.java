package zoho_geeks_for_geeks.aug15;

import java.util.HashMap;
import java.util.HashSet;

public class CountPairs {
    public static void main(String[] args) {
        int[] arr = { 1, 5, 4, 1, 2, 5 };
        int n = arr.length, k = 6;
        int count = 0;
        HashMap<Integer, Integer> hm = new HashMap<>();

        for (int i = 0; i < n; i++) {
            if (hm.containsKey(k - arr[i])) {
                count += hm.get(k - arr[i]);
            }
            if (hm.containsKey(arr[i])) {
                hm.put(arr[i], hm.get(arr[i]) + 1);
            } else {
                hm.put(arr[i], 1);
            }
        }
        char c = 'b';
        int a = c;
        System.out.println(a - 'a');

        System.out.println(count);
    }
}
