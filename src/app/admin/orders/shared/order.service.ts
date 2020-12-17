import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../login-admin/authentication.service';
import {environment} from '../../../../environments/environment';
import {Order} from '../../../shared/models/order.model';
import {OrderStatus} from '../../../shared/models/orderStatus.model';

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

  getItems(): Observable<Order[]> {
    // Add authorization header with jwt token
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    // Get from api
    return this.http.get<Order[]>(this.ordersApiUrl, httpOptions);
  }

  updateOrder(order: Order): Observable<Order> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());
    return this.http.put<Order>(this.ordersApiUrl + '/' + order.id, order, httpOptions);
  }
}
