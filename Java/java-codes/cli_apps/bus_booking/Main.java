package cli_apps.bus_booking;

import java.util.Scanner;

import cli_apps.bus_booking.entity.Customer;

public class Main {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        new Bus();

        do {
            System.out.print(
                    "\n1. Admin Login\n2. Customer Sign-up\n3. Book Tickets\n4. Exit\n");
            System.out.print("\nEnter the choice: ");
            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    boolean isAdminLogesIn = Bus.adminLogin();
                    do {
                        System.out.println("\n1. Add new Bus\n2. Booking Summary\n3. Logout admin\n");
                        System.out.print("\nEnter the choice: ");
                        int adminChoice = sc.nextInt();
                        switch (adminChoice) {
                            case 1:
                                Bus.addBus();
                                break;
                            case 2:
                                break;
                            case 3:
                                isAdminLogesIn = false;
                                break;
                            default:
                                break;
                        }
                    } while (isAdminLogesIn);
                    break;
                case 2:
                    // Bus.customerSignUp();
                    Bus.bookTickets(null);
                    break;
                case 3:
                    Customer customer = Bus.customerLogin();
                    boolean authCustomer = false;
                    if (customer != null) {
                        authCustomer = true;
                    }
                    while (authCustomer) {
                        System.out.print("\n    1. Bus Options\n    2. Seat Selection\n    \n3. Exit booking\n");
                        int userChoice = sc.nextInt();
                        switch (userChoice) {
                            case 1:
                                Bus.busDetails();
                                break;
                            case 2:
                                Bus.bookTickets(customer);
                                authCustomer = false;
                                break;
                            case 3:
                                customer = null;
                                authCustomer = false;
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case 4:
                    System.out.println("\nThank you visit again\n");
                    return;
                default:
                    break;
            }
        } while (true);
    }
}
