package taught_problems;

class Node {
    int data;
    Node next;

    public Node(int data) {
        this.data = data;
    }
}

public class PalindromeLinkedList {
    public static void main(String[] args) {

        int[] palindrome = { 4, 0, 1, 3, 1, 0, 4 };
        Node head = null, tail = null;

        for (int i = 0; i < palindrome.length; i++) {
            Node node = new Node(palindrome[i]);

            if (head == null) {
                head = tail = node;
            } else {
                tail = tail.next = node;
            }
        }
        // display(head);
    }

    // public static boolean findPalindrome(Node head) {

    // }

    public static void display(Node head) {
        while (head != null) {
            System.out.println(head.data);
            head = head.next;
        }
    }
}
