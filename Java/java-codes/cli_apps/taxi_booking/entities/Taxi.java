package cli_apps.taxi_booking.entities;

import java.util.ArrayList;
import java.util.List;

public class Taxi {
    private static int primaryKey = 1;

    private int taxiNo;
    private int curPlace;
    private int availableTime;
    private float totalEarnings;
    private List<Booking> bookings;

    public Taxi() {
        this.taxiNo = primaryKey++;
        this.curPlace = 1;
        this.availableTime = 0;
        this.totalEarnings = 0;
        this.bookings = new ArrayList<>();
    }

    public int getTaxiNo() {
        return taxiNo;
    }

    public void setTaxiNo(int taxiNo) {
        this.taxiNo = taxiNo;
    }

    public int getCurPlace() {
        return curPlace;
    }

    public void setCurPlace(int curPlace) {
        this.curPlace = curPlace;
    }

    public int getAvailableTime() {
        return availableTime;
    }

    public void setAvailableTime(int availableTime) {
        this.availableTime = availableTime;
    }

    public float getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(float totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void addBooking(Booking booking) {
        this.bookings.add(booking);
    }

    public void displayBookings() {
        List<Booking> bookings = this.getBookings();
        int sno = 1;

        System.out.println("\nS.No\tPickup point\tDrop point\tPickup time\tDrop time\tAmount");
        System.out.println("------------------------------------------------------------------------------");

        for (Booking booking : bookings) {
            System.out.println((sno++) + "\t     " + booking.getPickup() + "\t\t    " + booking.getDrop() + "\t\t     "
                    + booking.getPickupTime() + "\t\t    " + booking.getDropTime() + "\t\t" + booking.getAmount());
        }
    }
}
