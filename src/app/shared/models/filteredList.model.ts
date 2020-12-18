import {Filter} from './filter.model';


export class FilteredList<T> {
  filterUsed: Filter;
  totalCount: number;
  list: T[];
}
