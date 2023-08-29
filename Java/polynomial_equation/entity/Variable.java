package polynomial_equation.entity;

public class Variable {
    private char alphabet;
    private int exponent;

    private Variable next;

    public char getAlphabet() {
        return alphabet;
    }

    public void setAlphabet(char alphabet) {
        this.alphabet = alphabet;
    }

    public int getExponent() {
        return exponent;
    }

    public void setExponent(int exponent) {
        this.exponent = exponent;
    }

    public Variable getNext() {
        return next;
    }

    public void setNext(Variable next) {
        this.next = next;
    }
}
