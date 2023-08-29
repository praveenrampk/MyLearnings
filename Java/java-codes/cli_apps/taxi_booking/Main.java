package cli_apps.taxi_booking;

import java.util.Scanner;

public class Main {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        new ManageTaxiBooking();
        do {
            System.out.println(
                    "\n1. Add new taxi\n2. Book taxi\n3. All taxi booking details\n4. Taxies position\n5. Exit\n");
            System.out.print("Enter the choice: ");
            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    ManageTaxiBooking.addTaxi();
                    break;
                case 2:
                    ManageTaxiBooking.bookingTaxi();
                    break;
                case 3:
                    ManageTaxiBooking.getBookingDetails();
                    break;
                case 4:
                    ManageTaxiBooking.taxiesPosition();
                    break;
                case 5:
                    System.out.println("\nThank you for choosing our taxi reservation system\nVisit again..!\n");
                    return;
            }
        } while (true);
    }
}
