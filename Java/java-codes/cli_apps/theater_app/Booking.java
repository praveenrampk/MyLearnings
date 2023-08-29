package cli_apps.theater_app;

import java.util.List;

public class Booking {
    private int bookingId;
    private int tickets;
    private int preferredClass;
    private int screen;
    private int time;
    private List<Integer> seatsAlloted;
    private float discount[] = new float[2];
    private float ticketPrice;
    private float totalAmount;

    public Booking(int bookingId, int tickets, int preferredClass, int screen, int time, List<Integer> seatsAlloted,
            float[] discount,
            float ticketPrice,
            float totalAmount) {

        this.tickets = tickets;
        this.bookingId = bookingId;
        this.preferredClass = preferredClass;
        this.screen = screen;
        this.time = time;
        this.seatsAlloted = seatsAlloted;
        this.discount = discount;
        this.ticketPrice = ticketPrice;
        this.totalAmount = totalAmount;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public int getPreferredClass() {
        return preferredClass;
    }

    public void setPreferredClass(int preferredClass) {
        this.preferredClass = preferredClass;
    }

    public int getTickets() {
        return tickets;
    }

    public void setTickets(int tickets) {
        this.tickets = tickets;
    }

    public int getScreen() {
        return screen;
    }

    public void setScreen(int screen) {
        this.screen = screen;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public float getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(float ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public List<Integer> getSeatsAlloted() {
        return seatsAlloted;
    }

    public void setSeatsAlloted(List<Integer> seatsAlloted) {
        this.seatsAlloted = seatsAlloted;
    }

    public float[] getDiscount() {
        return discount;
    }

    public void setDiscount(float[] discount) {
        this.discount = discount;
    }

    public float getTickPrice() {
        return ticketPrice;
    }

    public void setTickPrice(float ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }
}
