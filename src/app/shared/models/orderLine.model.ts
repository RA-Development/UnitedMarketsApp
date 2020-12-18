import {Product} from '../../modules/products/shared/product.model';
import {Order} from '../../admin/orders/shared/order.model';

export class OrderLine {
  id?: number;
  productId: number;
  product?: Product;
  quantity: number;
  orderId?: number;
  order?: Order;
  subTotalPrice: number;

}
