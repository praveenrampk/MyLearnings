package rough;
import java.util.Scanner;

class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

public class Hello {

    static Node head = null;
    static Node tail = null;
    public static void main(String[] args) {
        int size;
        try (Scanner scan = new Scanner(System.in)) {
            System.out.print("size: ");
            size = scan.nextInt();
        }
        for (int i = 0; i < size; i++) {
            createNodes(i + 1);
        }

        getNodes();
    }

    public static void createNodes (int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = tail = newNode;
            head.next = tail.next = null;
            return;
        }

        tail.next = newNode;
        tail = newNode;
    }

    public static void getNodes () {
        tail = head;

        while (tail != null) {
            System.out.print(tail.data + " ");
            tail = tail.next;
        }
    }
}
