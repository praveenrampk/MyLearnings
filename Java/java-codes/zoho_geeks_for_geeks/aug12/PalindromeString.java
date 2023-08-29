package zoho_geeks_for_geeks.aug12;

public class PalindromeString {
    int isPalindrome(String S) {
        int n = S.length() - 1;

        for (int i = 0; i < n; i++) {
            if (S.charAt(i) != S.charAt(n - i)) {
                return 0;
            }
        }

        return 1;
    }
}
