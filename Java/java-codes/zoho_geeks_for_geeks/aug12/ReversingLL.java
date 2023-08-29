package zoho_geeks_for_geeks.aug12;

public class ReversingLL {
    Node reverseList(Node cur) {
        Node prev = null, next = null;

        while (cur != null) {
            next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }

        return prev;
    }
}
