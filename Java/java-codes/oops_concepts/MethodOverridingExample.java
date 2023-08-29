package oops_concepts;

class Animal {
    void makeSound(int data) {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound(int nu) {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    void makeSound(int um) {
        System.out.println("Cat meows");
    }
}

public class MethodOverridingExample {
    public static void main(String[] args) {
        Animal animal1 = new Animal();
        Animal dog = new Dog();
        Animal cat = new Cat();

        animal1.makeSound(0);
        dog.makeSound(0);
        cat.makeSound(0);
    }
}
