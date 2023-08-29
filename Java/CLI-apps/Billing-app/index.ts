import { question, scanner } from "./helpers/input-scanner";
import { CustomersTypes, InventoryTypes, InvoicesTypes } from "./helpers/input-scanner/interfaces";
import { inventories } from "./utils/inventories";

class Invoices implements InvoicesTypes {
  day: number;
  date: Date;
  items: InventoryTypes[];
  subTotal: number;

  constructor(day: number, items: InventoryTypes[]) {
    this.day = day;
    this.date = new Date();
    this.items = new Array();
    this.subTotal = 0;
  }
}

class Customers implements CustomersTypes {
  name: string;
  phone: number;
  visited: Record<string, InventoryTypes[]>;
  totalPay: number;

  constructor(name: string, phone: number) {
    this.name = name;
    this.phone = phone;
    (this.visited = {}), (this.totalPay = 0);
  }
}

(async () => {
  while (true) {
    console.log(
      "1. Buy new items\n2. View Customers\n3. View One Customer's Details\n4. Exit Billing..."
    );
    let choice: number = parseInt(await question("Enter the choice: "));

    switch (choice) {
      case 1:
        console.log("1");
        break;
      case 2:
        console.log("2");
        break;
      case 3:
        console.log("3");
        break;
      case 4:
        console.log("Thank you visit again");
        scanner.close();
        return;
      default:
        console.log("Invalid choice, Please Try again");
        break;
    }
  }
})(); //drive code
