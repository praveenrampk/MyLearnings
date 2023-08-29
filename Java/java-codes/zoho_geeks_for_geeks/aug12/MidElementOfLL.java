package zoho_geeks_for_geeks.aug12;

class Node {
    int data;
    Node next;
}

public class MidElementOfLL {
    int getMiddle(Node head) {
        Node slow = head, fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow.data;
    }
}
