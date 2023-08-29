package zoho_geeks_for_geeks.aug15;

public class MiddlePattern {
    public static void main(String[] args) {
        String S = "PROGRAM";
        int n = S.length();
        int mid = S.length() / 2;
        int i = mid;
        String prev = "";

        do {
            prev += S.charAt(i++ % n);
            System.out.print(prev + "$ ");
        } while (i % n != mid);
    }
}
