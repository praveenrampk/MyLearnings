package cli_apps.theater_app;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;

public class ManageTheater {
    private static final int NUM_HALLS = 2;
    private static final int NUM_SEATS = 15;
    private static int bookingId = 0;
    private static Scanner sc = new Scanner(System.in);

    static HashMap<String, SeatingArrangements> seatingsMap = new HashMap<>();
    static HashMap<Integer, Booking> bookingsMap = new HashMap<>();

    public ManageTheater() {
        initializeSeatingArrangements();
    }

    private static void initializeSeatingArrangements() {
        for (int i = 1; i <= NUM_HALLS; i++) {
            SeatingArrangements hall = new SeatingArrangements();
            int[] screen = new int[NUM_SEATS];
            for (int j = 0; j < NUM_SEATS; j++) {
                screen[j] = 0;
            }
            hall.setScreen1(screen);
            hall.setScreen2(Arrays.copyOf(screen, screen.length));
            seatingsMap.put(String.valueOf(i), hall);
        }
    }

    public static void seatingArrangements() {
        for (int i = 1; i <= NUM_HALLS; i++) {
            SeatingArrangements seats = seatingsMap.get(String.valueOf(i));
            System.out.println("\n\t\tHALL -- " + i);
            System.out.println("\t\t=========");
            System.out.println("Screen - 1, Time - 4pm");
            printSeatings(i, seats.getScreen1());
            System.out.println("Screen - 2, Time - 8pm");
            printSeatings(i, seats.getScreen2());
        }
    }

    private static void printSeatings(int hall, int[] screen) {
        System.out.println("-----------------------------------");
        for (int i = 0; i < NUM_SEATS; i++) {
            if (i != 0 && i % 5 == 0) {
                System.out.println();
            }
            System.out.print(screen[i] + "\t");
        }
        System.out.println("\n-----------------------------------\n");
    }

    public static void bookTickets() {
        System.out.print("\nEnter No of Tickets: ");
        int tickets = sc.nextInt();

        int[] preference = displayScreensAndTime();
        List<Integer> seatsAlloted = isTicketsAvailable(preference[0], preference[1], preference[2], tickets);
        if (seatsAlloted.size() != 0) {
            generateBill(tickets, preference, seatsAlloted);
        } else {
            System.out.println("\nTickets not available for your preference");
        }
    }

    private static int[] displayScreensAndTime() {
        System.out.print("\n1. Screen 1 : 4 PM : 5 Seats(First Class) ");
        System.out.print("\n2. Screen 1 : 4 PM : 10 Seats(Second Class) ");
        System.out.print("\n3. Screen 1 : 8 PM : 5 Seats(First Class) ");
        System.out.print("\n4. Screen 1 : 8 PM : 10 Seats(Second Class) ");
        System.out.print("\n5. Screen 2 : 4 PM : 5 Seats(First Class) ");
        System.out.print("\n6. Screen 2 : 4 PM : 10 Seats(Second Class) ");
        System.out.print("\n7. Screen 2 : 8 PM : 5 Seats(First Class) ");
        System.out.print("\n8. Screen 2 : 8 PM : 10 Seats(Second Class) \n\n");

        System.out.print("\nEnter the Choice (1/2/3/4/5/6/7/8) : ");
        int choice = sc.nextInt();
        int screen, preferredClass, time;

        if (choice > 4) {
            screen = 2;
        } else {
            screen = 1;
        }
        if ((choice & 1) == 0) {
            preferredClass = 2;
        } else {
            preferredClass = 1;
        }
        if (choice == 1 || choice == 2 || choice == 5 || choice == 6) {
            time = 4;
        } else {
            time = 8;
        }

        int[] preference = { screen, preferredClass, time };

        return preference;
    }

    private static List<Integer> isTicketsAvailable(int screen, int preferredClass, int time, int tickets) {
        SeatingArrangements hall = seatingsMap.get(String.valueOf(screen));
        int start, size, countSeats = 0;
        int[] seats;
        List<Integer> seatsAlloted = new ArrayList<>();

        if (time == 4) {
            seats = hall.getScreen1();
        } else {
            seats = hall.getScreen2();
        }

        if ((preferredClass & 1) == 1) {
            start = 0;
            size = NUM_SEATS - 10;
        } else {
            start = 5;
            size = NUM_SEATS;
        }

        for (int i = start; i < size; i++) {
            if (seats[i] == 0) {
                countSeats++;
            }
            if (countSeats == tickets) {
                break;
            }
        }
        if (countSeats == tickets) {
            for (int i = start; i < size; i++) {
                if (countSeats == 0) {
                    if (time == 4) {
                        hall.setScreen1(seats);
                        hall.getScreen1();
                    } else {
                        hall.setScreen2(seats);
                        hall.getScreen2();
                    }
                    seatingsMap.put(String.valueOf(screen), hall);
                    return seatsAlloted;
                }
                if (seats[i] == 0) {
                    seatsAlloted.add(i + 1);
                    seats[i] = 1;
                    --countSeats;
                }
            }
        }
        return seatsAlloted;
    }

    private static float[] findDiscount(String coupon, int preferredClass, int tickets) {
        float priceOfTicket = 100;
        float discount[] = new float[2];

        if (preferredClass == 1) {
            priceOfTicket = 120;
        } else {
            preferredClass = 100;
        }

        switch (coupon) {
            case "D10":
                discount[0] = 10;
                discount[1] = (priceOfTicket * tickets * 10) / 100;
                return discount;
            case "D20":
                discount[0] = 20;
                discount[1] = (priceOfTicket * tickets * 20) / 100;
                return discount;
            case "D30":
                discount[0] = 30;
                discount[1] = (priceOfTicket * tickets * 30) / 100;
                return discount;
            default:
                discount[0] = 0;
                discount[1] = 0;
                return discount;
        }
    }

    private static void generateBill(int tickets, int[] preference, List<Integer> seatsAlloted) {
        System.out.println("\n>> ********* VALID COUPON's (D10, D20, D30) ********* >>\n");
        System.out.print("Do You Have a Coupon if have Enter Else 0 : ");

        String coupon = sc.next();
        float discount[] = new float[2];
        discount = findDiscount(coupon, preference[1], tickets);
        float ticketPrice;

        if (preference[1] == 1) {
            ticketPrice = 120 * tickets;
        } else {
            ticketPrice = 100 * tickets;
        }
        float totalAmount = ticketPrice - discount[1];

        Booking bill = new Booking(bookingId + 1, tickets, preference[1], preference[0], preference[2], seatsAlloted,
                discount, ticketPrice, totalAmount);

        bookingsMap.put(++bookingId, bill);
        seeSingleBill(bookingId);
    }

    public static void bookingSummary() {
        System.out.println("\n\t\tBooked Tickets");
        System.out.println("\t\t==============\n");
        if (bookingsMap.size() > 0) {
            for (Integer key : bookingsMap.keySet()) {
                Booking bill = bookingsMap.get(key);
                System.out.println("________________________________________");
                System.out.println("Booking_ID " + bill.getBookingId());
                System.out.println("\nSeats Alloted\t\t:  " + bill.getSeatsAlloted());
                System.out.println("Movie\t\t\t:  Viruman-2");
                System.out.println("Screen " + bill.getScreen() + "\t\t:  " + bill.getTime() + "pm");
                System.out.println("Ticket Price\t\t:  " + bill.getTickPrice());
                System.out.println("Discount " + bill.getDiscount()[0] + " -/-\t:  " + bill.getDiscount()[1]);
                System.out.println("Total Amount\t\t:  " + bill.getTotalAmount());
            }
            System.out.println("________________________________________");
        } else {
            System.out.println("\nNo more bookings here,..");
        }
    }

    public static void seeSingleBill(int bookingId) {
        if (bookingsMap.containsKey(bookingId)) {
            Booking bill = bookingsMap.get(bookingId);
            System.out.println("\n\n----------------------------------------");
            System.out.println("Booking_ID " + bill.getBookingId());
            System.out.println("\nSeats Alloted\t\t:  " + bill.getSeatsAlloted());
            System.out.println("Movie\t\t\t:  Viruman-2");
            System.out.println("Screen " + bill.getScreen() + "\t\t:  " + bill.getTime() + "pm");
            System.out.println("Ticket Price\t\t:  " + bill.getTickPrice());
            System.out.println("Discount " + bill.getDiscount()[0] + " -/-\t:  " + bill.getDiscount()[1]);
            System.out.println("Total Amount\t\t:  " + bill.getTotalAmount());
            System.out.println("----------------------------------------");
            System.out.println("\n");
        } else {
            System.out.println("\nInvalid Booking Id,...");
        }
    }

    public static void cancelBooking(int bookId) {
        if (bookingsMap.containsKey(bookId)) {
            Booking bill = bookingsMap.get(bookId);
            System.out.println("\nYour Booking ID - " + bookId + " was successfully cancelled");
            System.out.println("\nAllocated seats are now cancelled\t\t:\t" + bill.getSeatsAlloted());
            System.out.println("Total Amount you're paid for all tickets\t\t:\t" + bill.getTotalAmount());
            System.out.println("Commission for all ");
        } else {
            System.out.println("\nInvalid Booking Id,...");
        }
    }
}
