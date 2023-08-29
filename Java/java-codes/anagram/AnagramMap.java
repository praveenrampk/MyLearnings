package anagram;
import java.util.HashMap;
import java.util.Scanner;

public class AnagramMap {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.print("Enter the First String: ");
            String string1 = sc.nextLine();
            System.out.print("Enter the Second String: ");
            String string2 = sc.nextLine();

            if (string1.length() != string2.length()) {
                System.out.println("Not an Anagram");
                return;
            }
            if (findAnagram(string1.toLowerCase(), string2.toLowerCase())) {
                System.out.println("Anagram");
                return;
            }
            System.out.println("Not An Anagram");

        } catch (Exception e) {
            System.out.println("Exception occurs: " + e);
        }
    }

    public static boolean findAnagram(String string1, String string2) {
        HashMap<Character, Integer> hashMap = new HashMap<>();

        for (int i = 0; i < string1.length(); i++) {
            char letter = string1.charAt(i);
            hashMap.put(letter, hashMap.getOrDefault(letter, 0) + 1);
        }
        System.out.println("HashMap: " + hashMap);

        for (int i = 0; i < string2.length(); i++) {
            char letter = string2.charAt(i);
            if (hashMap.containsKey(letter)) {
                int value = hashMap.get(letter);
                if (value > 1) {
                    hashMap.put(letter, value - 1);
                } else {
                    hashMap.remove(letter);
                }
            } else {
                return false;
            }
        }

        return hashMap.isEmpty();
    }
}
