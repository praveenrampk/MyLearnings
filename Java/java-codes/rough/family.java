package rough;
class familyNodes {
    String name, gender;
    String dad, mom;
    String child, sibling;
    familyNodes next;

    familyNodes(String name, String gender, String dad, String mom, String child, String sibling) {
        this.name = name;
        this.gender = gender;
        this.dad = null;
        this.mom = null;
        this.child = null;
        this.sibling = null;
        this.next = null;
    }
}

public class family {
    public static void main(String[] args) {

    }
}