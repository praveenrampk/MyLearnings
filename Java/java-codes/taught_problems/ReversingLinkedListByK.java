package taught_problems;

class Node {
    int data;
    Node next;

    public Node(int data) {
        this.data = data;
    }
}

public class ReversingLinkedListByK {
    public static void main(String[] args) {
        int[] elements = { 1, 2, 3, 4, 5, 6, 7, 8 };
        int k = 2;
        Node head = null, tail = null;

        for (int i = 0; i < elements.length; i++) {
            Node node = new Node(elements[i]);

            if (head == null) {
                head = tail = node;
            } else {
                tail = tail.next = node;
            }
        }
        head = reverseByK(head, k);
        display(head);
    }

    public static Node reverseByK(Node head, int k) {
        Node current = head;
        Node next = null;
        Node prev = null;
        int count = 0;

        while (count < k && current != null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
            count++;
        }

        if (next != null) {
            System.out.println("head: " + head.data);
            System.out.println("next: " + next.data);
            head.next = reverseByK(next, k);
        }

        return prev;
    }

    public static void display(Node cur) {
        while (cur != null) {
            System.out.print(cur.data + " ");
            cur = cur.next;
        }
    }
}
