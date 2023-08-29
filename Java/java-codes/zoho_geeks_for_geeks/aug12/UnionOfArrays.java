package zoho_geeks_for_geeks.aug12;

import java.util.HashSet;

public class UnionOfArrays {
    public static int doUnion(int a[], int n, int b[], int m) {
        HashSet<Integer> union = new HashSet<>();

        for (int i = 0; i < n; i++) {
            union.add(a[i]);
        }

        for (int i = 0; i < m; i++) {
            union.add(b[i]);
        }

        return union.size();
    }
}
