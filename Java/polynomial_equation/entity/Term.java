package polynomial_equation.entity;

public class Term {
    private int coefficient;
    private Variable alphabets;
    private char operator;

    public int getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(int coefficient) {
        this.coefficient = coefficient;
    }

    public Variable getAlphabets() {
        return alphabets;
    }

    public void setAlphabets(Variable alphabets) {
        this.alphabets = alphabets;
    }

    public char getOperator() {
        return operator;
    }

    public void setOperator(char operator) {
        this.operator = operator;
    }
}
