package taught_problems;

class Node {
    int data;
    Node next;

    public Node(int data) {
        this.data = data;
    }
}

public class SegregateOddEven {
    public static void main(String[] args) {
        int[] oddEven = { 2, 4, 1, 3, 1, 2, 8 };
        Node head = null, tail = null;

        for (int i = 0; i < oddEven.length; i++) {
            Node newNode = new Node(oddEven[i]);
            if (head == null) {
                head = tail = newNode;
            } else {
                tail = tail.next = newNode;
            }
        }
        display(segregateOddEven(head));
    }

    public static Node segregateOddEven(Node cur) {
        Node eHead = new Node(0);
        Node eTail = eHead;
        Node oHead = new Node(0);
        Node oTail = oHead;

        while (cur != null) {
            if ((cur.data & 1) == 0) {
                eTail.next = cur;
                eTail = eTail.next;
            } else {
                oTail.next = cur;
                oTail = oTail.next;
            }
            cur = cur.next;
        }

        eTail.next = oHead.next;
        oTail.next = null;

        return eHead.next;
    }

    public static void display(Node cur) {
        while (cur != null) {
            System.out.print(cur.data + " ");
            cur = cur.next;
        }
    }
}
