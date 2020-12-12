import { Component, OnInit } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Market} from '../markets/shared/market.model';
import {Router} from '@angular/router';
import {OrderService} from './shared/order.service';
import {AuthenticationService} from '../login-admin/authentication.service';

@Component({
  selector: 'app-orders',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  markets$: Observable<Market[]>;
  err: string;
  errormessage = '';
  username: string;

  constructor(private orderService: OrderService,
              private router: Router,
              private authService: AuthenticationService) {
    this.username = authService.getUsername();
  }

  ngOnInit(): void {
    // TODO: Replace!
    this.markets$ = this.orderService.getItems()
      .pipe(
        tap(() => this.err = undefined),
        catchError(err => {
          this.err = err.error ?? err.message;
          document.getElementById('p1').innerHTML = 'Loading error...';
          return of([]);
        })
      );
    // .subscribe(listOfMarkets => this.markets = listOfMarkets);
  }

}
