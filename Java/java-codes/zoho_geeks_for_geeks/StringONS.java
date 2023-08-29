package zoho_geeks_for_geeks;

public class StringONS {
    public static void main(String[] args) {
        String name = "praveen";
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < name.length(); i++) {
            for (int j = 0; j < name.length(); j++) {
                if (i == j || j + i == name.length() - 1) {
                    System.out.print("* ");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}
