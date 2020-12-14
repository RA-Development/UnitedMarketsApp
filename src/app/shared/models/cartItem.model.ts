import {Product} from '../../modules/products/shared/product.model';

export class CartItem {
  product?: Product;
  qty?: number;
  totalPrice?: number;
}
