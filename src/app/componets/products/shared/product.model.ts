import {Market} from '../../../shared/models/market.model';
import {Origin} from '../../../shared/models/origin.model';

export class Product {
  id?: number;
  name: string;
  price: string;
  amount: number;
  marketId: number;
  market: Market;
  originId: number;
  origin: Origin;

}
