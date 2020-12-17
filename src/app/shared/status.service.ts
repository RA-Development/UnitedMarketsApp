import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OrderStatus} from './models/orderStatus.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusApiUrl = environment.apiUrl + 'statuses';


  constructor(private http: HttpClient) {
  }

  getStatuses(): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(this.statusApiUrl);

  }
}
