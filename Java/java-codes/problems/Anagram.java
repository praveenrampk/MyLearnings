package problems;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class Anagram {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.print("Enter the string 1: ");
        String string1 = sc.nextLine();
        System.out.print("Enter the string 2: ");
        String string2 = sc.nextLine();

        System.out.println(isAnagram(string1, string2));
    }

    private static boolean isAnagram(String string1, String string2) {
        int len1 = string1.length();
        int len2 = string2.length();

        if (len1 != len2) {
            return false;
        }
        HashMap<Character, Integer> nameMap = new HashMap<>();
        ArrayList<Integer> nums = new ArrayList<>();

        for (int i = 0; i < len1; i++) {
            nameMap.put(string1.charAt(i), nameMap.getOrDefault(string1.charAt(i), 0) + 1);
        }

        for (int i = 0; i < len1; i++) {
            if (nameMap.containsKey(string2.charAt(i))) {
                int key = nameMap.get(string2.charAt(i));

                if (key > 1) {
                    nameMap.put(string2.charAt(i), key - 1);
                } else {
                    nameMap.remove(string2.charAt(i));
                }
            } else {
                return false;
            }
        }

        return nameMap.isEmpty();
    }
}
