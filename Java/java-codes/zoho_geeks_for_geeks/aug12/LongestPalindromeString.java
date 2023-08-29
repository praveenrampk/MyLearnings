package zoho_geeks_for_geeks.aug12;

public class LongestPalindromeString {

    static String longestPalin(String s) {
        if (s.length() == 1)
            return s;

        String longestPal = "";
        for (int i = 0; i < s.length() - 1; i++) {

            String pal1 = solve(s, i, i);
            String pal2 = solve(s, i, i + 1);

            if (longestPal.length() < pal1.length())
                longestPal = pal1;
            if (longestPal.length() < pal2.length())
                longestPal = pal2;

        }

        return longestPal;
    }

    static String solve(String s, int i, int j) {
        System.out.println("i: :" + i + ", j: " + j);
        while (i >= 0 && j < s.length() && s.charAt(i) == s.charAt(j)) {
            i--;
            j++;
        }

        System.out.println("ai: " + i + ", aj: " + j);
        String output = s.substring(i + 1, j);
        System.out.println("output: " + output);
        return output;
    }

    public static void main(String[] args) {
        System.out.println(longestPalin("ebbaaaa"));
    }
}
