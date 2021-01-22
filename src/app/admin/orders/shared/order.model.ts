import {OrderLine} from '../../../shared/models/orderLine.model';
import {Status} from '../../../shared/models/status.model';

export class Order {
  id?: number;
  products: OrderLine[];
  totalPrice: number;
  dateCreated?: Date;
  billingAddress: string;
  shippingAddress: string;
  statusId?: number;
  status?: Status;
}
