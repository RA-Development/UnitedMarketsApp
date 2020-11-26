import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Filter} from '../../../shared/models/filter.model';
import {Observable} from 'rxjs';
import {FilteredList} from '../../../shared/models/filteredList.model';
import {Product} from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  productsApiUrl = environment.apiUrl + 'products';


  getFilteredList(filter: Filter): Observable<FilteredList<Product>> {
    let url = this.productsApiUrl + '?';
    url = url + 'marketId=' + filter.marketId;
    return this.http.get<FilteredList<Product>>(url);
  }
}
