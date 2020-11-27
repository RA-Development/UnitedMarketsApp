import {Market} from '../../../shared/models/market.model';
import {CountryOrigin} from '../../../shared/models/countryOrigin.model';

export class Product {
  id?: number;
  name: string;
  price: string;
  amount: number;
  marketId: number;
  market: Market;
  countryOriginId: number;
  countryOrigin: CountryOrigin;

}
