package zoho_faq.tech_round;

import java.util.ArrayList;
import java.util.Scanner;

class Bus {
    int busTime;
    ArrayList<Integer> passengers = new ArrayList<>();
    Bus next;

    public Bus(int busTime) {
        this.busTime = busTime;
        this.next = null;
    }
}

public class BusPassengers {

    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        int[] busTiming = { 5, 10 };
        int[] pasTiming = { 1, 6, 7, 15, 16, 17 };
        System.out.print("\nEnter the bus capacity: ");
        int capacity = sc.nextInt();

        Bus tail = null;

        int i = 0, j = 0, k = 0;
        int n = busTiming.length, m = pasTiming.length;

        Bus bus = new Bus(busTiming[0]);
        tail = bus;

        while (j < m) {
            if (busTiming[i] >= pasTiming[j] && k < capacity) {
                bus.passengers.add(pasTiming[j]);
                j++;
                k++;
            } else {
                i++;
                if (i < n) {
                    bus = new Bus(busTiming[i]);
                    bus.next = tail;
                    tail = bus;
                    k = 0;
                } else {
                    break;
                }
            }
        }
        while (tail != null) {
            ArrayList<Integer> passengers = tail.passengers;
            i = passengers.size() - 1;
            j = passengers.size() - 2;

            if (i < 0) {
                System.out.println(tail.busTime);
                return;
            } else if (passengers.size() < capacity && passengers.get(i) != tail.busTime) {
                System.out.println(tail.busTime);
                return;
            }
            while (j >= 0) {
                if (passengers.get(i) - passengers.get(j) > 1) {
                    System.out.println(passengers.get(i) - 1);
                    return;
                }
                i--;
                j--;
            }
            if (tail.next != null) {
                if (passengers.get(0) - tail.next.busTime > 1
                        || (passengers.get(0) - tail.next.passengers.get(tail.next.passengers.size() - 1) > 1)) {
                    System.out.println(passengers.get(0) - 1);
                    return;
                }
            } else {
                System.out.println(passengers.get(passengers.size() - 1) - 1);
                return;
            }
            tail = tail.next;
        }
        System.out.println("you are too late");
    }
}
