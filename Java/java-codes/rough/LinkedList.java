package rough;
import java.util.*;

class Node {
    char letter;
    int count;
    Node next;

    Node(char letter) {
        this.letter = letter;
        this.count = 1;
        this.next = null;

    }
}

class MakeList {
    Node head, tail;
    Map<Character, Node> myMap;

    MakeList() {
        head = null;
        tail = null;
        myMap = new LinkedHashMap<>();
    }

    void checkAndCreateNode (char letter) {
        if (myMap.containsKey(letter)) {
            myMap.get(letter).count++;
            return;
        } else {
            Node newNode = new Node(letter);
            myMap.put(letter, newNode);
            if (head == null) {
                head = tail = newNode;
                return;
            }
            tail = tail.next = newNode;
        }
    }
    void displayList () {
        Node currentNode = head;
        while (currentNode != null) {
            System.out.println("Letter: " + currentNode.letter + ", Count: " + currentNode.count);
            currentNode = currentNode.next;
        }
        System.out.println(myMap);
    }
}

public class LinkedList {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String name = sc.nextLine();
        MakeList connectList = new MakeList();

        for (int i = 0; i < name.length(); i++) {
            connectList.checkAndCreateNode(name.charAt(i));
        }
        connectList.displayList();
    }
}

//'Droid Sans Mono', 'monospace', monospace