export interface InventoryTypes {
  name: string;
  uom: string;
  rate: number;
  stock: number;
}

export interface InvoicesTypes {
  day: number;
  date: Date;
  items: InventoryTypes[],
  subTotal: number;
}

export interface CustomersTypes {
  name: string;
  phone: number;
  visited: Record<string, InventoryTypes[]>,
  totalPay: number;
}