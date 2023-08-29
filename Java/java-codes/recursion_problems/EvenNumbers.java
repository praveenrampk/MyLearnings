package recursion_problems;

import java.util.ArrayList;

public class EvenNumbers {
    public static void main(String[] args) {
        findEven(0, 51);
    }

    public static void findEven(int start, int num) {
        System.out.print(start + " ");
        if (start > num || (start > num && start % 2 != 0)) {
            return;
        }
        findEven(start + 2, num);
    }

    public static int wordBreak(String word, ArrayList<String> B) {
        int size = word.length();

        if (size == 0) {
            return 1;
        }

        for (int i = 1; i <= size; i++) {
            if (B.contains(word.substring(0, i)) && wordBreak(word.substring(i, size), B) == 1) {
                return 1;
            }
        }

        return 0;
    }
}
