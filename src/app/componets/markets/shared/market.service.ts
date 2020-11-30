import { Injectable } from '@angular/core';
import {Market} from './market.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  marketApiUrl = environment.apiUrl + 'markets';
  constructor(private http: HttpClient) {
  }

  getMarkets(): Observable<Market[]> {
    return this.http.get<Market[]>(this.marketApiUrl);
  }
}
