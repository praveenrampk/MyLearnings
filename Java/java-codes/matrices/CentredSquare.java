package matrices;

public class CentredSquare {
    public static void main(String[] args) {
        int n = 5;
        generateCenteredSquareMatrix(n);
    }

    public static void generateCenteredSquareMatrix(int n) {
        int center;
        if (n % 2 == 0) {
            center = (n + 2) / 2;
        } else {
            center = (n + 1) / 2;
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                int distanceX = Math.abs(center - i);
                int distanceY = Math.abs(center - j);
                int distance = Math.max(distanceX, distanceY);
                System.out.print(center - distance + " ");
            }
            System.out.println();
        }
    }
}
