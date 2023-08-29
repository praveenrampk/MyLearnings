package round_2;

import java.util.Scanner;

public class Vowels {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringBuilder sb = new StringBuilder();

        char[] input = sc.nextLine().toCharArray();

        for (int i = 0; i < input.length; i++) {
            if (!isVowel(input[i])) {
                sb.append('#');
                sb.append(convertCase(input[i]));
            }
        }

        System.out.println(sb.toString());
    }

    public static boolean isVowel(char c) {

        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            c = Character.toLowerCase(c);
            switch (c) {
                case 'a':
                    return true;
                case 'e':
                    return true;
                case 'i':
                    return true;
                case 'o':
                    return true;
                case 'u':
                    return true;
                default:
                    return false;
            }
        }
        return false;
    }

    public static char convertCase(char c) {
        if (Character.isUpperCase(c))
            return Character.toLowerCase(c);
        return Character.toUpperCase(c);
    }
}
