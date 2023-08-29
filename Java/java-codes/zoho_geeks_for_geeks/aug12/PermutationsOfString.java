package zoho_geeks_for_geeks.aug12;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

public class PermutationsOfString {
    public List<String> find_permutation(String S) {
        ArrayList<String> permutations = new ArrayList<>();
        HashSet<String> unique = new HashSet<>();

        permute(permutations, S, 0, S.length() - 1);

        for (String s : permutations) {
            unique.add(s);
        }

        permutations.clear();
        permutations.addAll(unique);
        Collections.sort(permutations);

        return permutations;
    }

    public static List<String> permute(List<String> permu, String S, int l, int r) {
        if (l == r) {
            permu.add(S);
        } else {
            for (int i = l; i <= r; i++) {
                S = swap(S, l, i);
                permute(permu, S, l + 1, r);
                S = swap(S, l, i);
            }
        }

        return permu;
    }

    public static String swap(String S, int i, int j) {
        StringBuilder s1 = new StringBuilder(S);

        char temp1 = s1.charAt(i);
        char temp2 = s1.charAt(j);

        s1.setCharAt(i, temp2);
        s1.setCharAt(j, temp1);

        return s1.toString();
    }
}
