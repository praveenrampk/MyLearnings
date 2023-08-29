package zoho_geeks_for_geeks.aug15;

public class MajorityOfElements {
    // majority > n / 2

    public static void main(String[] args) {
        int[] elements = { 1, 2, 1, 3, 1, 1 };
        System.out.println(majorityElement(elements, elements.length));
    }

    static int majorityElement(int a[], int n) {
        // 1 2, 2, 3, 3, 3, 3
        int majority = 0, count = 0;

        for (int i = 0; i < n; i++) {
            if (count == 0) {
                majority = a[i];
                count = 1;
            } else if (majority != a[i]) {
                count--;
            } else {
                count++;
            }
        }
        System.out.println(majority);
        int check = 0;

        for (int i = 0; i < n; i++) {
            if (majority == a[i]) {
                check++;
            }
        }

        if (check > n / 2) {
            return majority;
        }

        return -1;

    }
}
