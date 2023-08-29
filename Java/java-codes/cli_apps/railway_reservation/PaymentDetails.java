package cli_apps.railway_reservation;

public class PaymentDetails {
    private float ticketFare;
    private float irtcTax;
    private float totalFare;

    public float getTicketFare() {
        return ticketFare;
    }

    public void setTicketFare(float ticketFare) {
        this.ticketFare = ticketFare;
    }

    public float getIrtcTax() {
        return irtcTax;
    }

    public void setIrtcTax(float irtcTax) {
        this.irtcTax = irtcTax;
    }

    public float getTotalFare() {
        return totalFare;
    }

    public void setTotalFare(float totalFare) {
        this.totalFare = totalFare;
    }
}