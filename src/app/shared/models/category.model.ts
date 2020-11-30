import {Product} from '../../componets/products/shared/product.model';

export class Category {
  id?: number;
  name?: string;
  products: Product[];
}
