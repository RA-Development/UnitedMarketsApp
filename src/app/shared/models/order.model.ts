import {OrderLine} from './orderLine.model';
import {OrderStatus} from './orderStatus.model';

export class Order {
  id?: number;
  products: OrderLine[];
  totalPrice: number;
  dateCreated?: Date;
  billingAddress: string;
  shippingAddress: string;
  orderStatusId: number;
  orderStatus?: OrderStatus;
}
