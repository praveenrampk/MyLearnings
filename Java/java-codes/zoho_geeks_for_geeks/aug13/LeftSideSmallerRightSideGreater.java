package zoho_geeks_for_geeks.aug13;

public class LeftSideSmallerRightSideGreater {
    public static int findElement(int arr[], int n) {
        int maxMid = arr[0];
        boolean isAnyDeductionOnMid = false;

        for (int i = 1; i < n - 1; i++) {
            if (maxMid <= arr[i] && !isAnyDeductionOnMid) {
                maxMid = arr[i];
                isAnyDeductionOnMid = true;
            }

            if (arr[i] > arr[i + 1]) {
                isAnyDeductionOnMid = false;
            }
        }

        if (!isAnyDeductionOnMid) {
            return -1;
        }

        return maxMid;
    }

    public static void main(String[] args) {
        int[] arr = { 1, 2, 1, 4, 5, 6 };
        System.out.println(findElement(arr, arr.length));
    }
}
