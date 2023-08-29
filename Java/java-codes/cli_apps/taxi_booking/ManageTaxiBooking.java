package cli_apps.taxi_booking;

import cli_apps.taxi_booking.constants.Env;
import cli_apps.taxi_booking.entities.Booking;
import cli_apps.taxi_booking.entities.Taxi;
import java.util.HashMap;
import java.util.Scanner;

public class ManageTaxiBooking {
    static Scanner sc = new Scanner(System.in);
    static HashMap<Integer, Taxi> taxiesMap = new HashMap<>();

    public ManageTaxiBooking() {
        initializeTaxies();
    }

    private void initializeTaxies() {
        for (int i = 1; i <= 4; i++) {
            Taxi taxi = new Taxi();
            taxiesMap.put(taxi.getTaxiNo(), taxi);
        }
    }

    public static void bookingTaxi() {
        System.out.print("\nNumber of bookings: ");
        int n = sc.nextInt();

        for (int i = 1; i <= n; i++) {
            System.out.println("\nInput - " + i);
            int pickup, drop, pickupTime, dropTime, distance;
            float earnings;

            System.out.print("\n  Pickup point: ");
            pickup = sc.nextInt();
            System.out.print("  Drop point: ");
            drop = sc.nextInt();
            System.out.print("  Pickup time: ");
            pickupTime = sc.nextInt();
            distance = findDistance(pickup, drop);
            earnings = Env.AMOUNT * distance;

            if (pickupTime + distance > 24) {
                dropTime = pickupTime + distance - 24;
            } else {
                dropTime = pickupTime + distance;
            }

            int taxiNo = searchTaxi(pickupTime, pickup);

            if (taxiNo == 0) {
                System.out.println("\nAll taxies are busy.. Please try in other timings");
                return;
            }
            System.out.println("\nTaxi no - " + taxiNo + ", is allocated..");

            if (taxiesMap.containsKey(taxiNo)) {
                Taxi taxi = taxiesMap.get(taxiNo);
                editTaxi(taxiNo, drop, dropTime, earnings);
                taxi.addBooking(new Booking(pickup, drop, pickupTime, dropTime, earnings));
                taxiesMap.put(taxiNo, taxi);
            }
        }
    }

    private static int searchTaxi(int availability, int pickup) {
        Taxi taxiToBeBooked = null;
        int lowestDistance = Integer.MAX_VALUE;

        for (int taxiNo : taxiesMap.keySet()) {
            Taxi taxi = taxiesMap.get(taxiNo);
            int distance = calcPickupDistance(taxi.getCurPlace(), pickup);

            if (taxi.getAvailableTime() <= availability) {
                if (distance < lowestDistance) {
                    lowestDistance = distance;
                    taxiToBeBooked = taxi;

                } else if (distance == lowestDistance) {
                    if (taxiToBeBooked.getTotalEarnings() > taxi.getTotalEarnings()) {
                        taxiToBeBooked = taxi;
                    }
                    lowestDistance = distance;
                }
            }
        }
        if (taxiToBeBooked == null) {
            return 0;
        }
        return taxiToBeBooked.getTaxiNo();
    }

    private static int calcPickupDistance(int taxiPosition, int pickup) {
        return findDistance(taxiPosition, pickup);
    }

    private static int findDistance(int a, int b) {
        return Math.abs(a - b);
    }

    public static void getBookingDetails() {
        if (taxiesMap.size() > 0) {
            for (int taxiNo : taxiesMap.keySet()) {
                Taxi taxi = taxiesMap.get(taxiNo);
                if (taxi.getBookings().size() > 0) {
                    System.out.println(
                            "\n[Taxi No: " + taxi.getTaxiNo() + "|\t|" + "Earnings: " + taxi.getTotalEarnings() + "]");
                    taxi.displayBookings();
                    System.out.println();
                }
            }
        }
    }

    public static void addTaxi() {
        Taxi taxi = new Taxi();
        taxiesMap.put(taxi.getTaxiNo(), taxi);
        System.out.println("\nNew Taxi - " + taxi.getTaxiNo() + ", added successfully");
    }

    private static void editTaxi(int taxiNo, int curPlace, int dropTime, float earnings) {
        if (taxiesMap.containsKey(taxiNo)) {
            Taxi editedTaxi = taxiesMap.get(taxiNo);

            editedTaxi.setCurPlace(curPlace);
            editedTaxi.setAvailableTime(dropTime);
            editedTaxi.setTotalEarnings(earnings + editedTaxi.getTotalEarnings());

            taxiesMap.put(taxiNo, editedTaxi);
        }
    }

    public static void taxiesPosition() {
        int taxiIndex = 1;
        System.out.println("\nS.No\tTaxi_No\t\tCurrent_Position\tAvailable_Time");
        System.out.println("----\t-------\t\t----------------\t--------------");

        for (int taxiNo : taxiesMap.keySet()) {
            Taxi taxi = taxiesMap.get(taxiNo);

            System.out.print(" " + (taxiIndex++) + ".\t " + taxiNo + "\t\t       " + taxi.getCurPlace() + "\t\t   ");

            if (taxi.getAvailableTime() == 0) {
                System.out.print("Free now\n");
            } else {
                System.out.print("Free at " + taxi.getAvailableTime() + "\n");
            }
        }
    }
}
