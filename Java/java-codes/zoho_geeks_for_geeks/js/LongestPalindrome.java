package zoho_geeks_for_geeks.js;

public class LongestPalindrome {
    static String longestPalin(String S) {
        int n = S.length();
        String longestPal = new String();
        int longestLen = 0;

        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                String isPalind = S.substring(i, j + 1);
                if (isPalindrome(isPalind)) {
                    if (isPalind.length() > longestLen) {
                        longestPal = isPalind;
                        longestLen = isPalind.length();
                    }
                }
            }
        }

        return longestPal;
    }

    public static boolean isPalindrome(String S) {
        int n = S.length() - 1;

        for (int i = 0; i < n; i++) {
            if (S.charAt(i) != S.charAt(n - i)) {
                return false;
            }
        }

        return true;
    }
}