import {Market} from '../../../shared/models/market.model';

export class Product {
  id?: number;
  name: string;
  price: string;
  amount: number;
  marketId: number;
  market: Market;
  countryOriginId: number;
  // countryOrigin: CountryOrigin;

}
