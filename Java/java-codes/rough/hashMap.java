package rough;
import java.util.HashMap;
import java.util.Scanner;

public class hashMap {
    public static void main(String[] args) {
        HashMap<Character, Number> hashMap = new HashMap<>();

        try (Scanner scan = new Scanner(System.in)) {
            System.out.print("Enter String 1: ");
            String str1 = scan.nextLine();
            // System.out.print("Enter String 2: ");
            // String str2 = scan.nextLine();

            for (int i = 0; i < str1.length(); i++) {
                char ch = str1.charAt(i);

                if (!hashMap.containsKey(ch)) {
                    hashMap.put(ch, 1);
                } else {
                    int count = (int) hashMap.get(ch);

                    hashMap.put(ch, count + 1);
                }
            }
        }
        System.out.println(hashMap);
    }
}
