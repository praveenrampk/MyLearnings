package cli_apps.bus_booking.entity;

public class SeatDetails {
    private String passengerName;
    private char gender;
    private int seatNo;
    private boolean status;

    public SeatDetails(int seatNo) {
        this.gender = ' ';
        this.seatNo = seatNo;
        this.status = false;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public int getSeatNo() {
        return seatNo;
    }

    public void setSeatNo(int seatNo) {
        this.seatNo = seatNo;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
