import {Product} from '../../components/products/shared/product.model';

export class CartItem {
  product?: Product;
  qty?: number;
  totalPrice?: number;
}
