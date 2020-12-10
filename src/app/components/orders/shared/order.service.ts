import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../login-admin/authentication.service';
import {environment} from '../../../../environments/environment';
import {Market} from '../../markets/shared/market.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getItems(): Observable<Market[]> {
    // Add authorization header with jwt token
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    // Get from api TODO: Replace!
    return this.http.get<Market[]>(environment.apiUrl + 'markets/admin', httpOptions);
  }
}
