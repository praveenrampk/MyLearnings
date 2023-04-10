let scan = require('prompt-sync')();

const moviesList = [
    {name: 'Vaathi', screen: 1, time: 'morning', price: 120},
    {name: 'Vaathi', screen: 1, time: 'evening', price: 100},
    {name: 'Sardar', screen: 2, time: 'morning', price: 150},
    {name: 'Sardar', screen: 2, time: 'evening', price: 140},
];
const discountCoupons = ['d10', 'd20', 'd30'];
const seatings = [[
    [0, 0, 0, 0, 0], //1st class
    [0, 0, 0, 0, 0, //2nd
     0, 0, 0, 0, 0]//class
], [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0,
     0, 0, 0, 0, 0]
]];
class Booking {
    constructor () {
        this.userId = userId;
        this.moiveName = moiveName;
        this.screen = screen;   
        this.wantedSeats = [];
        
    }
}