package zoho_faq;

import java.util.ArrayList;

class Node {
    int data;
    Node child;
    Node next;

    public Node(int data) {
        this.data = data;
        this.child = null;
        this.next = null;
    }
}

public class LinkedList {
    public static void main(String[] args) {
        Node head = null;

        head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        head.next.next.next = new Node(4);
        head.next.next.next.next = new Node(5);

        Node c1 = new Node(4);
        c1.next = new Node(5);
        c1.next.child = new Node(0);
        c1.next.next = new Node(6);
        c1.next.next.child = new Node(110);
        c1.next.next.child.child = new Node(99);

        head.child = c1;
        c1.child = new Node(33);

        head.next.next.next.child = new Node(7);
        head.next.next.next.child.next = new Node(9);
        head.next.next.next.child.child = new Node(10);
        head.next.next.next.child.child.next = new Node(11);
        head.next.next.next.child.child.child = new Node(12);

        printNodeData(head);
    }

    static void printNodeData(Node cur) {
        ArrayList<Node> childQ = new ArrayList<>();
        childQ.add(cur);

        while (childQ.size() > 0) {
            Node curChild = childQ.remove(0);

            while (curChild != null) {
                System.out.print(curChild.data + " ");
                if (curChild.child != null) {
                    childQ.add(curChild.child);
                }
                curChild = curChild.next;
            }
        }
    }
}
