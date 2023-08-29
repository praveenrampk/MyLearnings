package problems;

import java.util.Scanner;

public class PalindromeName {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.print("Enter the name: ");
        System.out.println(makePalindromeName(sc.nextLine()));
    }

    private static String makePalindromeName(String name) {
        int n = name.length();
        StringBuilder appended = new StringBuilder();

        for (int i = 0; i < n; i++) {
            if (isPalindrome(name.substring(i, n))) {
                break;
            } else {
                appended.append(name.charAt(i));
            }
        }

        return name + appended.reverse().toString();
    }

    private static boolean isPalindrome(String name) {
        int n = name.length() - 1;

        for (int i = 0; i <= n; i++) {
            if (name.charAt(i) != name.charAt(n - i)) {
                return false;
            }
        }
        return true;
    }
}
