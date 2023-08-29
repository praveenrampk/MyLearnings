package taught_problems;

class Node {
    private int data;
    private Node next;

    public Node(int data) {
        this.data = data;
    }

    public int getData() {
        return this.data;
    }

    public void setData(int data) {
        this.data = data;
    }

    public Node getNext() {
        return this.next;
    }

    public void setNext(Node next) {
        this.next = next;
    }
}

public class ReversingLinkedList {
    public static void main(String[] args) {
        System.out.println();
        Node head = null, tail = null;

        for (int i = 1; i <= 5; i++) {
            Node node = new Node(i);

            if (head == null) {
                head = tail = node;
            } else {
                tail.setNext(node);
                tail = tail.getNext();
            }
        }
        display(reverseList(head));
    }

    public static Node reverseList(Node cur) {
        Node prev = null, next = null;

        while (cur != null) {
            next = cur.getNext();
            cur.setNext(prev);
            prev = cur;
            cur = next;
        }

        return prev;
    }

    public static void display(Node head) {
        while (head != null) {
            System.out.print(head.getData() + " ");
            head = head.getNext();
        }
    }
}
