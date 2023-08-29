package rough;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class FindDuplicates {
    public static void main(String[] args) {
        HashMap<String, Integer> hm = new HashMap<>();
        String sentences = "Naveen Kaveen Kaveen Praveen Naveen Naveen Kaveen Priya Queen Priya";
        String[] words = sentences.split("\\s+");

        for (int i = 0; i < words.length; i++) {
            hm.put(words[i], hm.getOrDefault(words[i], 0) + 1);
        }
        System.out.println("hm: " + hm);

        Iterator<Map.Entry<String, Integer>> iterator = hm.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, Integer> entry = iterator.next();
            if (entry.getValue() % 2 == 0) {
                iterator.remove();
            } else {
                hm.put(entry.getKey(), 1);
            }
        }
        Math.max(1, 2);
        System.out.println("Final Output: " + hm.keySet());
    }
}
