import readline from 'readline';

export const scan = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
export interface ItemDetails {
    name: string,
    rate: number,
    uom: string,
    quantity: number,
    subTotal: number,
};
export let myStore: {id: number, name: string, quantity: number, rate: number}[] = [
    { id: 1, name: 'Rice',   quantity: 500, rate: 20 },
    { id: 2, name: 'Wheat',  quantity: 500, rate: 30 },
    { id: 3, name: 'Dhalls', quantity: 500, rate: 40 },
    { id: 4, name: 'Apple',  quantity: 500, rate: 120 },
    { id: 5, name: 'Orange', quantity: 500, rate: 100 },
    { id: 6, name: 'Mango',  quantity: 500, rate: 60 }
];