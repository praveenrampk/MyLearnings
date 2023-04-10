const scan = require('prompt-sync')();

const myStore = [
    {name: "Rice", quantity: 200, price: 50},
    {name: "Wheat", quantity: 500, price: 40},
    {name: "Dhalls", quantity: 300, price: 60},
    {name: "Apple", quantity: 500, price: 120},
    {name: "Orange", quantity: 300, price: 90},
];
class Invoices {
    constructor () {
        this.date = new Date();
        this.itemName = null;
        this.quantity = null;
        this.rate = null;
        this.uom = 'kgs';
        this.subTotal = null;
    };
};
class Customers {
    constructor () {
        this.customerName = customerName;
        this.phone = phone;
        this.todaysTotal = 0;
        this.grandTotal = 0;
        this.invoices = new Invoices();
        this.collectInvoices = [];
    };
};
let head = null, tail = null;

(mainFunction =_=> {

    let choice;

    while (true) {
        console.log('\n1. Buy New Items     2. View My Store        3. View All Customers       4. View One Customers Details       5. Exit');

    }
})();