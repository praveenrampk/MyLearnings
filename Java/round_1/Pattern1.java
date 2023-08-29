import java.util.Scanner;

class Pattern1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        for (int i = 0; i < n; i++) {
            for (int j = i; j < (n + i); j++) {
                System.out.print((j % n) + 1 + " ");
            }
            System.out.println();
        }
    }
}