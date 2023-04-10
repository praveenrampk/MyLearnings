import readline from 'readline';

const scan = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

interface ItemDetails {
    name: string,
    rate: number,
    uom: string,
    quantity: number,
    subTotal: number,
};
let myStore: {id: number, name: string, quantity: number, rate: number}[] = [
    { id: 1, name: 'Rice',   quantity: 500, rate: 20 },
    { id: 2, name: 'Wheat',  quantity: 500, rate: 30 },
    { id: 3, name: 'Dhalls', quantity: 500, rate: 40 },
    { id: 4, name: 'Apple',  quantity: 500, rate: 120 },
    { id: 5, name: 'Orange', quantity: 500, rate: 100 },
    { id: 6, name: 'Mango',  quantity: 500, rate: 60 }
];

class Invoices implements ItemDetails {
    name: string;
    rate: number;
    uom: string;
    quantity: number;
    subTotal: number;
    constructor (name: string, rate: number, quantity: number) {
        this.name = name;
        this.quantity = quantity;
        this.uom = 'kgs';
        this.rate = rate;
        this.subTotal = 0;
    }
}
class Customers extends Invoices {
    customerName: string;
    phone: number;
    date: string;
    total: number;
    next: Customers | null;
    constructor (customerName: string, phone: number, itemName: string, rate: number, quantity: number) {
        super(itemName, rate, quantity);
        this.customerName = customerName;
        this.phone = phone;
        this.date = new Date().toLocaleString();
        this.total = 0;
        this.next = null;
    }
}
let head: Customers | null = null, tail: Customers | null = null;

(function () {
    let choice: number;
    
    console.log('\n1. Buy Items     2. View Store     3. View All Customer     4. View One Customer Invoices    5. Exit\n');

    const processInput = (c: string) => {
      choice = Number(c);
      console.log(choice);
      scan.close();
    };
  
    scan.on('close', () => {
      switch (choice) {
        case 1:
          console.log('Buy Items');
          break;
        case 2:
          console.log('View Store');
          break;
        case 3:
          console.log('View All Customer');
          break;
        case 4:
          console.log('View One Customer Invoices');
          break;
        case 5:
          console.log('Exiting...');
          break;
        default:
          console.log('Invalid choice.');
      }
    });
  })();