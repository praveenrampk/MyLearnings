package zoho_geeks_for_geeks.aug16;

import java.util.HashSet;

public class Rough {
    public static void main(String[] args) {
        int[] arr1 = { 2, 4, 5, 8 };
        int[] arr2 = { 1, 3, 7, 9 };

        String x = "23", y = "2323";
        StringBuilder sb = new StringBuilder(y);

        HashSet<Integer> hs = new HashSet<>(12);
        hs.add(0);
        hs.add(12);
        Iterator iterator = hs.iterator();
        System.out.println(hs.clone());
    }
}
