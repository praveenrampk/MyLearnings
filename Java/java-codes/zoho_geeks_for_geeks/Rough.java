package zoho_geeks_for_geeks;

public class Rough {
    public static void main(String[] args) {
        String s1 = "2599";
        String s2 = "23";
        String sum = "";

        int len1 = s1.length();
        int len2 = s2.length();
        int carryOver = 0;

        for (int i = len1 - 1; i >= 0; i--) {
            int temp1 = Integer.parseInt(String.valueOf(s1.charAt(i)));
            int temp2 = Integer.parseInt(String.valueOf(s2.charAt(i)));
            System.out.println("temp1: " + temp1 + "\ntemp2: " + temp2);
            temp1 += temp2 + carryOver;
            Integer.parseInt(sum);

            if (temp1 > 9) {
                sum += temp1 % 10;
                System.out.println("sum: " + sum);
                carryOver = temp1 / 10;
                System.out.println("carry: " + carryOver);
            }
        }

        for (int i = len1 - len2 - 1; i >= 0; i--) {
            int temp1 = Integer.parseInt(String.valueOf(s1.charAt(i)));
            temp1 += carryOver;

            if (temp1 > 9 && i != 0) {
                sum += temp1 % 10;
                carryOver = temp1 / 10;
            } else {
                sum += temp1;
            }
        }

        System.out.println(sum);
    }

}
