import {Origin} from '../../../shared/models/origin.model';
import {AmountUnit} from '../../../shared/models/amountUnit.model';
import {Market} from '../../markets/shared/market.model';

export class Product {
  id: number;
  name: string;
  price?: number;
  pricePerUnit: number;
  amount: number;
  marketId: number;
  market: Market;
  originId: number;
  origin: Origin;
  amountUnitId: number;
  amountUnit: AmountUnit;


}
