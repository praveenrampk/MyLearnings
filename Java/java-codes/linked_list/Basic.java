package linked_list;

import java.util.HashSet;

class Node {
    int data;
    Node next;

    public Node(int data) {
        this.data = data;
    }
}

public class Basic {
    public static void main(String[] args) {

        HashSet<Integer> union = new HashSet<>();

        int[] palindrome = { 2, 1, 1, 2 };
        Node head = null, tail = null;
        String name = "fdlkasfdj";
        StringBuilder mame = new StringBuilder();
        mame.delete(0, mame.length());

        mame.toString();
        for (int i = 0; i < palindrome.length; i++) {
            Node node = new Node(palindrome[i]);

            if (head == null) {
                head = tail = node;
            } else {
                tail = tail.next = node;
            }
        }
        System.out.println(findPalindrome(head));
    }

    public static boolean findPalindrome(Node cur) {
        Node mid = cur, fast = cur;

        while (fast != null && fast.next != null) {
            mid = mid.next;
            if (fast.next.next == null || fast.next.next != null) {
                fast = fast.next.next;
            } else {
                fast = fast.next;
            }
        }

        mid.next = reverseList(mid);
        display(cur);
        System.out.println();
        display(mid);
        System.out.println();

        while (mid != null) {
            if (cur.data != mid.data) {
                return false;
            }
            mid = mid.next;
            cur = cur.next;
        }
        return true;
    }

    public static Node reverseList(Node cur) {
        Node prev = null, next = null;

        while (cur != null) {
            next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
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
