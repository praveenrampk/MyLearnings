package zoho_geeks_for_geeks.aug14;

public class PowerOfNumbers {
    public static void main(String[] args) {
        long X = 100, Y = 1;
        modify("practice");
    }

    public static String modify(String s) {
        String vowels = "aeiou";
        StringBuilder sb = new StringBuilder(s);
        char[] detector = new char[s.length()];
        int index = 0;

        for (int i = 0; i < s.length(); i++) {
            if (vowels.indexOf(s.charAt(i)) != -1) {
                detector[index++] = s.charAt(i);
            }
        }

        for (int i = 0; i < s.length(); i++) {
            if (vowels.indexOf(s.charAt(i)) != -1) {
                sb.setCharAt(i, detector[--index]);
            }
        }
        System.out.println(sb);
        return s;
    }
}
