package zoho_faq;

import java.util.Scanner;
import java.util.Stack;

public class StringBrackets {
    static Scanner sc = new Scanner(System.in);
    static Stack<Integer> chars = new Stack<>();

    public static void main(String[] args) {
        // [[i[[evol]]zoho]]
        String array = "i[evol]tniarbilac";
        String output = "";
        StringBuilder sb = new StringBuilder(array.toString());

        performOperation(sb);
        System.out.println();
        for (int i = 0; i < sb.length(); i++) {
            if (sb.charAt(i) != '[' && sb.charAt(i) != ']')
                output += sb.charAt(i);
        }
        System.out.println(output);
    }

    static void performOperation(StringBuilder array) {
        for (int i = 0; i < array.length(); i++) {
            if (array.charAt(i) == '[') {
                chars.push(i);
            } else if (array.charAt(i) == ']') {
                reverse(array, chars.pop() + 1, i - 1);
            }
        }
    }

    static void reverse(StringBuilder array, int from, int to) {
        for (int i = from; i <= (from + to) / 2; i++) {
            char temp1 = array.charAt(i);
            char temp2 = array.charAt(to - (i - from));
            array.setCharAt(i, temp2);
            array.setCharAt(to - (i - from), temp1);
        }
    }
}
