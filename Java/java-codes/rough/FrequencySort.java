package rough;
import java.util.*;

public class FrequencySort {
    public static void main(String[] args) {
        int[] array = { 5, 2, 9, 1, 5, 6, 5 };

        int[] sortedArray = frequencySort(array);

        System.out.println("Sorted array: " + Arrays.toString(sortedArray));
    }

    static int[] frequencySort(int[] array) {
        // Create a frequency map to store the occurrence of each element
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : array) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        // Create a list to store the unique elements of the array
        ArrayList<Integer> uniqueElements = new ArrayList<>();
        for (int num : array) {
            if (!uniqueElements.contains(num)) {
                uniqueElements.add(num);
            }
        }

        // Custom comparator to sort the unique elements based on frequency
        Comparator<Integer> frequencyComparator = (a, b) -> {
            int freqA = frequencyMap.get(a);
            int freqB = frequencyMap.get(b);

            return freqA != freqB ? Integer.compare(freqB, freqA) : Integer.compare(a, b);
        };

        // Sort the unique elements list based on frequency
        uniqueElements.sort(frequencyComparator);

        // Create the final sorted array
        int[] sortedArray = new int[array.length];
        int index = 0;
        for (int num : uniqueElements) {
            int freq = frequencyMap.get(num);
            for (int i = 0; i < freq; i++) {
                sortedArray[index++] = num;
            }
        }

        return sortedArray;
    }
}
