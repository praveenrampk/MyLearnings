import java.util.HashMap;
import java.util.Set;
import java.util.Map.Entry;

public class DuplicateNum {
    public static void main(String[] args) {
        int[] elements = { 1, 2, 3, 2, 3, 1, 5, 2, 1, 5, 0 };
        System.out.println(findUniqueElement(elements));
    }

    static Integer findUniqueElement(int elements[]) {
        HashMap<Integer, Integer> hashMap = new HashMap<>();

        for (int i = 0; i < elements.length; i++) {
            hashMap.put(elements[i], hashMap.getOrDefault(elements[i], 0) + 1);
            // if (hashMap.containsKey(elements[i]) && hashMap.get(elements[i]) > 1) {
            // hashMap.remove(elements[i]);
            // }
        }
        Set<Entry<Integer, Integer>> entries = hashMap.entrySet();
        return 0;
    }
}
