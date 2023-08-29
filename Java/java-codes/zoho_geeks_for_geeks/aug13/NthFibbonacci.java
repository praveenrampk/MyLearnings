package zoho_geeks_for_geeks.aug13;

public class NthFibbonacci {
    public static void main(String[] args) {
        long a = 0, b = 1, c = 0;
        int n = 10;
        System.out.print(b + " ");
        for (int i = 3; i <= n; i++) {
            c = a + b;
            System.out.print(c + " ");
            a = b;
            b = c;
        }
    }
}
