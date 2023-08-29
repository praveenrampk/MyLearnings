package cli_apps.railway_reservation;

public class Cabin {
    private int upper;
    private int middle;
    private int lower;
    private int sideUpper;
    private int sideLower;

    public Cabin() {
        this.upper = 2;
        this.middle = 2;
        this.lower = 2;
        this.sideUpper = 1;
        this.sideLower = 1;
    }

    public int getUpper() {
        return upper;
    }

    public void setUpper(int upper) {
        this.upper = upper;
    }

    public int getMiddle() {
        return middle;
    }

    public void setMiddle(int middle) {
        this.middle = middle;
    }

    public int getLower() {
        return lower;
    }

    public void setLower(int lower) {
        this.lower = lower;
    }

    public int getSideUpper() {
        return sideUpper;
    }

    public void setSideUpper(int sideUpper) {
        this.sideUpper = sideUpper;
    }

    public int getSideLower() {
        return sideLower;
    }

    public void setSideLower(int sideLower) {
        this.sideLower = sideLower;
    }
}
