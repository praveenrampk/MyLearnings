interface personType {
  id: number;
  name: string;
}

class Person implements personType {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
class Employee extends Person {
  position: string;
  constructor(id: number, name: string, position: string) {
    super(id, name);
    this.position = position;
  }
}
const obj = new Employee(137, "Praveen", "Block-Chain-Developer");
console.log(obj);
