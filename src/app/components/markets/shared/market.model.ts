import {Product} from '../../products/shared/product.model';

export interface Market {
  id: number;
  name: string;
  products: Product[];
}
