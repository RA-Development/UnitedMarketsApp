import {OrderLine} from './orderLine.model';
import {OrderStatus} from './orderStatus.model';

export class Order {
  id: number;
  orderLines: OrderLine[];
  dateCreated: Date;
  totalPrice: number;
  orderStatus: OrderStatus;
  orderStatusId: number;
}
