package cli_apps.bus_booking.entity;

import java.util.ArrayList;
import java.util.List;

public class SeaterBus {
    private static int donateACBusNo = 1;
    private static int donateNonACBusNO = 1;

    private String busNo;
    private String busType;
    private List<SeatDetails> A;
    private List<SeatDetails> B;
    private List<SeatDetails> C;
    private int availableSeats;
    private float totalFare;

    public SeaterBus(String busType) {
        this.busType = busType;
        if (this.busType.equals("AC")) {
            this.busNo = "AC/ST/" + (donateACBusNo++);
        } else {
            this.busNo = "NON-AC/ST/" + (donateNonACBusNO++);
        }
        this.A = new ArrayList<>();
        this.B = new ArrayList<>();
        this.C = new ArrayList<>();
        this.availableSeats = 0;
        this.totalFare = 0;

        for (int i = 1; i <= 4; i++) {
            A.add(new SeatDetails(i));
            B.add(new SeatDetails(i));
            C.add(new SeatDetails(i));
            this.availableSeats += 3;
        }
    }

    public String getBusNo() {
        return busNo;
    }

    public void setBusNo(String busNo) {
        this.busNo = busNo;
    }

    public String getBusType() {
        return busType;
    }

    public void setBusType(String busType) {
        this.busType = busType;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public List<SeatDetails> getA() {
        return A;
    }

    public void setA(List<SeatDetails> a) {
        A = a;
    }

    public List<SeatDetails> getB() {
        return B;
    }

    public void setB(List<SeatDetails> b) {
        B = b;
    }

    public List<SeatDetails> getC() {
        return C;
    }

    public void setC(List<SeatDetails> c) {
        C = c;
    }

    public float getTotalFare() {
        return totalFare;
    }

    public void setTotalFare(float totalFare) {
        this.totalFare = totalFare;
    }
}
