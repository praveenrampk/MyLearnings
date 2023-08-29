package zoho_geeks_for_geeks.aug12;

import java.util.HashMap;

public class MaxNoOfCharsAToB {
    static public int maxChars(String S) {
        HashMap<Character, Integer> distanceMap = new HashMap<>();
        int distance = -1;

        for (int i = 0; i < S.length(); i++) {
            if (distanceMap.containsKey(S.charAt(i))) {
                distance = Math.max(distance, i - distanceMap.get(S.charAt(i)) - 1);
            } else {
                distanceMap.put(S.charAt(i), i);
            }
        }

        return distance;
    }

    public static void main(String[] args) {
        System.out.println(maxChars("PraPeena"));
    }
}
