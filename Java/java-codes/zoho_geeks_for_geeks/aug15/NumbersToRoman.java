package zoho_geeks_for_geeks.aug15;

public class NumbersToRoman {
    public static void main(String[] args) {
        int num = 509;
        String roman = "";

        while (num != 0) {
            if (num >= 1 && num <= 4) {
                roman += romanValue(1);
                num -= 1;
            } else if (num >= 5 && num <= 9) {
                roman += romanValue(5);
                num -= 5;
            } else if (num >= 10 && num <= 49) {
                roman += romanValue(10);
                num -= 10;
            } else if (num >= 50 && num <= 99) {
                roman += romanValue(50);
                num -= 50;
            } else if (num >= 100 && num <= 499) {
                roman += romanValue(100);
                num -= 100;
            } else if (num >= 500 && num <= 999) {
                roman += romanValue(500);
                num -= 500;
            } else {
                roman += romanValue(1000);
                num -= 1000;
            }
        }

        System.out.println(roman);
    }

    public static char romanValue(int n) {
        switch (n) {
            case 1:
                return 'I';
            case 5:
                return 'V';
            case 10:
                return 'X';
            case 50:
                return 'L';
            case 100:
                return 'C';
            case 500:
                return 'D';
            case 1000:
                return 'M';
            default:
                return ' ';
        }
    }
}
