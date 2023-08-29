package recursion_problems;

public class NaturalNumbers {
    public static void main(String[] args) {
        System.out.println(naturalNumbers(5));
    }

    public static int naturalNumbers(int end) {
        if (end == 0) {
            return end;
        }
        return end + naturalNumbers(end - 1);
    }
}
