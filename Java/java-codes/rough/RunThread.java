package rough;
import multi_thread.Thread1;
import multi_thread.Thread2;
import multi_thread.Thread3;

public class RunThread {
    public static void main (String[] args) {
        Thread1 thread1 = new Thread1();
        Thread2 thread2 = new Thread2();
        Thread3 thread3 = new Thread3();

        thread1.start();
        thread3.start();
        thread2.start();
    }
}