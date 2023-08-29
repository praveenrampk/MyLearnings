package multi_thread;

public class Thread3 extends Thread {
    // @Override
    public void run() {
        long count = 1;
        for (long i = 1; i < 100; i++) {
            count = i * count; 
        }
        System.out.println("Thread-3");
    }
}