package cli_apps.railway_reservation;

import java.util.List;

public class Tickets {
    private int pnr;
    private List<PassengerDetails> listOfPassengers;
    private PaymentDetails paymentDetails;

    public int getPnr() {
        return pnr;
    }

    public void setPnr(int pnr) {
        this.pnr = pnr;
    }

    public List<PassengerDetails> getListOfPassengers() {
        return listOfPassengers;
    }

    public void setListOfPassengers(List<PassengerDetails> listOfPassengers) {
        this.listOfPassengers = listOfPassengers;
    }

    public PaymentDetails getPaymentDetails() {
        return paymentDetails;
    }

    public void setPaymentDetails(PaymentDetails paymentDetails) {
        this.paymentDetails = paymentDetails;
    }
}
