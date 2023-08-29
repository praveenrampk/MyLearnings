package cli_apps.railway_reservation;

import java.util.ArrayList;
import java.util.List;

public class Train {
    private int trainId;
    private List<Compartment> listOfCompartments;

    public Train() {
        List<Compartment> listOfCompartments =  new ArrayList<>();
        listOfCompartments.add(new Compartment());
        listOfCompartments.add(new Compartment());
    }

    public int getTrainId() {
        return trainId;
    }

    public void setTrainId(int trainId) {
        this.trainId = trainId;
    }

    public List<Compartment> getListOfCompartments() {
        return listOfCompartments;
    }

    public void setListOfCompartments(List<Compartment> listOfCompartments) {
        this.listOfCompartments = listOfCompartments;
    }
}
