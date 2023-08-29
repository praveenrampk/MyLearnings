package zoho_geeks_for_geeks;

public class StingPatternWithSpace {
    public static void main(String[] args) {
        String name = "zo";
        System.out.println(crossPattern(name));
        // System.out.println(printPattern(name, new StringBuilder(), 0, name.length() -
        // 1, name.length() - 1));
    }

    static String printPattern(String name, StringBuilder dupName, int front, int back, int n) {
        int frontCopy = front;
        int backCopy = back;

        if (front == n / 2) {
            dupName.append(name.charAt(front));
            return dupName.toString();
        }
        dupName.append(name.charAt(front));
        dupName.append(name.charAt(back));

        printPattern(name, dupName, front + 1, back - 1, n);

        dupName.append(name.charAt(frontCopy));
        dupName.append(name.charAt(backCopy));

        return dupName.toString();
    }

    static String crossPattern(String S) {
        StringBuilder ans = new StringBuilder();

        for (int i = 0; i < S.length(); i++) {
            for (int j = 0; j < S.length(); j++) {
                if (j == i || j == (S.length() - i - 1)) {
                    ans.append(S.charAt(j));
                } else {
                    ans.append('*');
                }
            }
        }
        return ans.toString();
    }
}
