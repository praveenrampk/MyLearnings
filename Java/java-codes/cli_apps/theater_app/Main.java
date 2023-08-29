package cli_apps.theater_app;

import java.util.Scanner;

public class Main {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        new ManageTheater();
        do {
            System.out.println(
                    "\n1. View seating arrangements\n2. Book tickets\n3. Booking summary\n4. To see one booking\n5. Cancel booking\n6. Exit\n");
            System.out.print("\nPick your choice: ");
            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    ManageTheater.seatingArrangements();
                    break;
                case 2:
                    ManageTheater.bookTickets();
                    break;
                case 3:
                    ManageTheater.bookingSummary();
                    break;
                case 4:
                    System.out.print("\nEnter the Booking ID: ");
                    int bookId = sc.nextInt();
                    ManageTheater.seeSingleBill(bookId);
                    break;
                case 5:
                    System.out.print("\nEnter the Booking ID: ");
                    bookId = sc.nextInt();
                    ManageTheater.cancelBooking(bookId);
                    break;
                case 6:
                    System.out.println("\nThank you for visiting our theater..!");
                    return;
                default:
                    System.out.println("\nYou picked invalid choice. Try again..!\n");
                    break;
            }
        } while (true);
    }
}
