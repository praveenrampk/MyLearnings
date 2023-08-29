package cli_apps.railway_reservation;

import java.util.ArrayList;
import java.util.List;

public class Compartment {
    private static int compartmentID;
    static {
        compartmentID = 21314;
    }
    private int coachNumber;
    private List<Cabin> listOfCabins;

    public Compartment() {
        this.coachNumber = compartmentID++;
        ArrayList<Cabin> listOfCabins = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            listOfCabins.add(new Cabin());
        }
        this.listOfCabins = listOfCabins;
    }

    public int getCoachNumber() {
        return coachNumber;
    }

    public void setCoachNumber(int coachNumber) {
        this.coachNumber = coachNumber;
    }

    public List<Cabin> getListOfCabins() {
        return listOfCabins;
    }

    public void setListOfCabins(List<Cabin> listOfCabins) {
        this.listOfCabins = listOfCabins;
    }
}
