package cli_apps.bus_booking.entity;

public class Customer {
    private static int customersId = 1;

    private int id;
    private String name;
    private char gender;
    private int age;
    private String password;

    public Customer(String name, String password, int age, char gender) {
        this.id = customersId++;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
