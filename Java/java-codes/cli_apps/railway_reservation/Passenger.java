package cli_apps.railway_reservation;

public class Passenger {
    private String name;
    private int age;
    private String gender;
    private String preference;

    public Passenger(String name, int age, String gender, String preference) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.preference = preference;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPreference() {
        return preference;
    }

    public void setPreference(String preference) {
        this.preference = preference;
    }
}
