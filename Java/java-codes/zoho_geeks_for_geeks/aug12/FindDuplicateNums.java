package zoho_geeks_for_geeks.aug12;

import java.util.ArrayList;

public class FindDuplicateNums {
    public ArrayList<Integer> duplicates(int arr[], int n) {
        ArrayList<Integer> b = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            arr[arr[i] % n] += n;
        }

        for (int i = 0; i < n; i++) {
            if (n * 2 <= arr[i]) {
                b.add(i);
            }
        }

        if (b.size() == 0) {
            b.add(-1);

            return b;
        }

        return b;
    }
}
