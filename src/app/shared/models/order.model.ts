import {OrderLine} from './orderLine.model';

export class Order {
  id: number;
  orderLines: OrderLine[];
  customerName: string;
  dateCreated: number;

}
