import {Product} from '../../components/products/shared/product.model';
import {Order} from './order.model';

export class OrderLine {
  id?: number;
  productId: number;
  product?: Product;
  quantity: number;
  orderId?: number;
  order?: Order;
  subTotalPrice: number;

}
