package zoho_geeks_for_geeks.aug15;

import java.util.ArrayList;

public class LeadersOfArray {
    static ArrayList<Integer> leaders(int arr[], int n) {
        ArrayList<Integer> al = new ArrayList<>();
        int[] leaders = new int[n];
        int index = 0;
        int prevMax = arr[n - 1];

        for (int i = n - 2; i >= 0; i--) {
            if (prevMax <= arr[i]) {
                leaders[index++] = prevMax;
                prevMax = arr[i];
            }
        }
        leaders[index] = prevMax;

        for (int i = index; i >= 0; i--) {
            al.add(leaders[i]);
        }

        return al;
    }
}
