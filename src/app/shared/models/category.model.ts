import {Product} from '../../modules/products/shared/product.model';

export class Category {
  id?: number;
  name?: string;
  products: Product[];
}
