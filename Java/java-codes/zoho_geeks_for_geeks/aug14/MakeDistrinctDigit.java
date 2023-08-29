package zoho_geeks_for_geeks.aug14;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

public class MakeDistrinctDigit {
    static public void common_digits(int[] nums) {
        HashSet<Integer> hs = new HashSet<>();
        StringBuilder setOfNums = new StringBuilder();
        String nu = new String();

        List<Integer> list = new ArrayList<>();

        for (int i = 0; i < nums.length; i++) {
            int num = nums[i];

            while (num > 0) {
                if (!list.contains(num % 10)) {
                    list.add(num % 10);
                }
                num /= 10;
            }
        }
        Collections.sort(list);
        System.out.println(list);

        return;
    }

    public static void main(String[] args) {
        int[] nums = { 121, 11, 28 };
        common_digits(nums);
    }

}
