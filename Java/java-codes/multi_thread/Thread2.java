package multi_thread;

public class Thread2 extends Thread {
    // @Override
    public void run() {
        long count = 2;
        for (long i = 1; i < 2100000000; i++) {
            count = count + i * i * count ^ i * count;
        }
        System.out.println("Thread-2");
    }
}