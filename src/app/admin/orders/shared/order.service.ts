import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../login-admin/authentication.service';
import {environment} from '../../../../environments/environment';
import {Order} from './order.model';
import {Status} from '../../../shared/models/status.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  ordersApiUrl = environment.apiUrl + 'orders';

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  getOrders(): Observable<Order[]> {
    // Add authorization header with jwt token
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    // Get from api
    return this.http.get<Order[]>(this.ordersApiUrl, httpOptions);
  }

  delete(id: number): Observable<Order> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());
    return this.http.delete<Order>(this.ordersApiUrl + '/' + id, httpOptions);
  }

  updateOrder(order: Order): Observable<Order> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());
    return this.http.put<Order>(this.ordersApiUrl + '/' + order.id, order, httpOptions);
  }
}
