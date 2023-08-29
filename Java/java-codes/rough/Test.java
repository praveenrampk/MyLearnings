package rough;
class Testing {
    static int praveen = 137;

    public Testing() {
    }

    int main(String[] args) {
        return praveen;
    }
}

public class Test {
    public static void main(String[] args) {
        Testing tst = new Testing();
        System.out.println(tst.main(args));
        
        Test test = new Test();
        System.out.println(test.sumTwoNumbers(1, 2));
    }

    int sumTwoNumbers(int a, int b) {
        return a + b;
    }
}
