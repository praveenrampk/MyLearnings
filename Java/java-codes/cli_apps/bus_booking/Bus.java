package cli_apps.bus_booking;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;

import cli_apps.bus_booking.constants.Env;
import cli_apps.bus_booking.entity.Customer;
import cli_apps.bus_booking.entity.SeaterBus;
import cli_apps.bus_booking.entity.SleeperBus;

public class Bus {
    static Scanner sc = new Scanner(System.in);

    static HashMap<String, List<SleeperBus>> sleeperBuses = new HashMap<>();
    static HashMap<String, List<SeaterBus>> seaterBuses = new HashMap<>();

    static HashMap<Integer, Customer> customersMap = new HashMap<>();

    public Bus() {
        initializeBuses();
    }

    private static void initializeBuses() {
        List<SleeperBus> sleeperBus = new ArrayList<>();
        List<SeaterBus> seaterBus = new ArrayList<>();

        sleeperBus.add(new SleeperBus("AC"));
        sleeperBus.add(new SleeperBus("NON-AC"));

        seaterBus.add(new SeaterBus("AC"));
        seaterBus.add(new SeaterBus("NON-AC"));

        sleeperBuses.put(Env.SLEEPER_BUS, sleeperBus);
        seaterBuses.put(Env.SEATER_BUS, seaterBus);
    }

    public static boolean adminLogin() {
        System.out.println("\n\n\tAdmin Login page\n\t----------------");
        while (true) {
            System.out.print("Enter your name: ");
            String name = sc.next();
            System.out.print("Enter your password: ");
            String password = sc.next();
            if (name.equals(Env.ADMIN_NAME) && password.equals(Env.ADMIN_PASSWORD)) {
                System.out.println("\nLogin successful..\n");
                return true;
            }
            System.out.println("\nAuthentication failed..!\nTry again\n");
        }
    }

    public static void addBus() {
        System.out.println("\nEnter the Basic Details to add Bus..\n");

        System.out.print("Do you want to add Sleeper/Seater bus: ");
        String bus = sc.next();
        System.out.print("\nIt is AC/NON-AC: ");
        String busType = sc.next();

        if (bus.equals(Env.SLEEPER_BUS)) {
            List<SleeperBus> sl = sleeperBuses.get(Env.SLEEPER_BUS);
            SleeperBus newBus = new SleeperBus(busType);

            sl.add(newBus);
            sleeperBuses.put(Env.SLEEPER_BUS, sl);
            System.out.println("\nSleeper Bus\n------------\n  Bus No: " + newBus.getBusNo() + "\n  Type: "
                    + newBus.getBusType() + "\nadded successfully..\n");
        } else {
            List<SeaterBus> st = seaterBuses.get(Env.SEATER_BUS);
            SeaterBus newBus = new SeaterBus(busType);
            st.add(newBus);

            seaterBuses.put(Env.SEATER_BUS, st);
            System.out.println("\nSleeper Bus\n------------\n  Bus No: " + newBus.getBusNo() + "\n  Type: "
                    + newBus.getBusType() + "\nadded successfully..\n");
        }
    }

    public static void customerSignUp() {
        System.out.print("\n\tCustomer Sign-up page\n\t---------------------");
        System.out.print("\n Name: ");
        String name = sc.nextLine();
        System.out.print(" Password: ");
        String password = sc.nextLine();
        System.out.print(" Age: ");
        int age = sc.nextInt();
        System.out.print(" Gender (M/F): ");
        char gender = sc.next().charAt(0);
        Customer customer = new Customer(name, password, age, gender);

        customersMap.put(customer.getId(), customer);
        System.out.println("\nNew Customer added, with Customer-ID: " + customer.getId());
        System.out.println("This user Can be authenticated by this ID: " + customer.getId());
    }

    public static Customer customerLogin() {
        Customer customer = null;
        System.out.println("\n\n\tCustomer Login page\n\t------------------");
        System.out.print("Enter your Customer ID: ");

        int id = sc.nextInt();
        if (!customersMap.containsKey(id)) {
            System.out.println("\nNo Customer available with this ID\n");
            return customer;
        }
        customer = customersMap.get(id);
        while (true) {
            System.out.print("Enter your password: ");
            String password = sc.next();
            if (password.equals(customer.getPassword())) {
                System.out.println("\nYou've logged in successfully..\n");
                return customer;
            }
            System.out.println("\nPassword Not matches..!\nTry again\n");
        }
    }

    public static void busDetails() {
        List<SleeperBus> sleeperBus = sleeperBuses.get(Env.SLEEPER_BUS);
        List<SeaterBus> seaterBus = seaterBuses.get(Env.SEATER_BUS);
        System.out.println();
        for (SleeperBus slBus : sleeperBus) {
            if (slBus.getAvailableSeats() > 0) {
                System.out.println(slBus.getBusType() + " Sleeper\t- "
                        + slBus.getAvailableSeats() + " Seats");
            }
        }
        for (SeaterBus stBus : seaterBus) {
            if (stBus.getAvailableSeats() > 0) {
                System.out.println(stBus.getBusType() + " Seater\t- "
                        + stBus.getAvailableSeats() + " Seats");
            }
        }
    }

    private static void sleeperBusDetails(SleeperBus slBus) {
        System.out.println(
                "\nBus no \t\t: " + slBus.getBusNo() + "\nBus type \t: " + slBus.getBusType() + "\nSeats avl \t: "
                        + slBus.getAvailableSeats());
        System.out.println("\n(Upper Deck)");
        System.out.println(" -------------");
        System.out.println(" |   | A | B |\n -------------");
        for (int i = 0; i < slBus.getA().size(); i++) {
            if (i < 2) {
                System.out.println(" | " +
                        (i + 1) + " | " + slBus.getA().get(i).getGender() + " | "
                        + slBus.getB().get(i).getGender() + " |");
                System.out.println(" -------------");
                if (i == 1) {
                    System.out.println("\n -------------");
                }
            } else {
                if (i == 3) {
                    System.out.println("\n(Lower Deck)");
                    System.out.println(" -------------\n |   | A | B |\n -------------");
                }
                System.out.println(" | " +
                        (i + 1) + " | " + slBus.getA().get(i).getGender() + " | "
                        + slBus.getB().get(i).getGender() + " |");
                System.out.println(" -------------");

                if (i == 4) {
                    System.out.println("\n -------------");
                }
            }
        }
    }

    private static void seaterBusDetails(SeaterBus stBus) {
        System.out.println(
                "\nBus no \t\t: " + stBus.getBusNo() + "\nBus type \t: " + stBus.getBusType() + "\nSeats avl \t: "
                        + stBus.getAvailableSeats());
        System.out.println("\n -----------------");
        System.out.println(" |   | A | B | C |\n -----------------");
        for (int i = 0; i < stBus.getA().size(); i++) {
            System.out.println(" | " +
                    (i + 1) + " | " + stBus.getA().get(i).getGender() + " | "
                    + stBus.getB().get(i).getGender() + " | " + stBus.getC().get(i).getGender() +
                    " |");
            System.out.println(" -----------------");
            if (i == 2) {
                System.out.println("\n -----------------");
            }
        }
    }

    private static void bookSleeperBus(List<SleeperBus> sl) {
        System.out.println("\n(Note: Ensure that, Seats count shouldn't be greater than available seats)");
        System.out.print("\nNo of Seats: ");
        // int noOfSeats = sc.nextInt();
    }

    public static void bookTickets(Customer customer) {
        System.out.print("\nEnter the bus options (1/2/3/4): ");
        int busOption = sc.nextInt();

        if (busOption == 1 || busOption == 2) {
            List<SleeperBus> sl = sleeperBuses.get(Env.SLEEPER_BUS);
            sleeperBusDetails(sl.get(busOption - 1));
            bookSleeperBus(sl);
        } else {
            List<SeaterBus> st = seaterBuses.get(Env.SEATER_BUS);
            System.out.println(st.get(busOption - 3).getBusNo());
            seaterBusDetails(st.get(busOption - 3));
        }
    }
}
