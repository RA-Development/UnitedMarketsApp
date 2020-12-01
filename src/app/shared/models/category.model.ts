import {Product} from '../../components/products/shared/product.model';

export class Category {
  id?: number;
  name?: string;
  products: Product[];
}
