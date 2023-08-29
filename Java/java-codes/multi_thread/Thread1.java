package multi_thread;

public class Thread1 extends Thread {
    // @Override
    public void run() {
        long count = 0;
        for (long i = 1; i < 2000000000; i++) {
            count = count + i * i * count ^ i * count;
            
        }
        System.out.println("Thread-1");
    }
}