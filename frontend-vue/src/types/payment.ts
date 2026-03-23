export interface Payment {
  id: number;
  orderId: number;
  customerName: string;
  amount: number;
  method: string;
  status: string;
  date: string;
}
