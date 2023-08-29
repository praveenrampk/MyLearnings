package zoho_geeks_for_geeks.aug15;

public class RomanToNumbers {
    static int value(char r) {
        switch (r) {
            case 'I':
                return 1;
            case 'V':
                return 5;
            case 'X':
                return 10;
            case 'L':
                return 50;
            case 'C':
                return 100;
            case 'D':
                return 500;
            case 'M':
                return 1000;
            default:
                return -1;
        }
    }

    public int romanToDecimal(String str) {
        int n = str.length();
        int res = value(str.charAt(n - 1));

        for (int i = n - 2; i >= 0; i--) {
            int prev1 = value(str.charAt(i));
            int prev2 = value(str.charAt(i + 1));

            if (prev1 >= prev2) {
                res += prev1;
            } else {
                res -= prev1;
            }
        }

        return res;
    }
}
