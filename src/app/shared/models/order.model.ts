import {OrderLine} from './orderLine.model';

export class Order {
  id?: number;
  products: OrderLine[];
  totalPrice: number;
  dateCreated?: Date;
  billingAddress: string;
  shippingAddress: string;
  orderStatusId: number;

}
