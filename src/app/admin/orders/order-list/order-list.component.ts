import { Component, OnInit } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Market} from '../../../components/markets/shared/market.model';
import {Router} from '@angular/router';
import {OrderService} from '../shared/order.service';
import {AuthenticationService} from '../../login-admin/authentication.service';
import {Order} from '../../../shared/models/order.model';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[];
  err: string;
  displayedColumns: string[] = ['id', 'date', 'price', 'status'];
  dataSource = new OrderDataSource(this.orderService);
  currentEntity: any;

  constructor(private orderService: OrderService,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    // TODO: Replace!
    this.orderService.getItems()
      .subscribe(
        response => {
          this.orders = response;
          console.log(this.orders);
        }
      );
  }

  onRowClicked(row): void {
    console.log(row.valueOf());
    this.router.navigateByUrl('admin/order/' + row.valueOf().id);
  }
}
export class OrderDataSource extends DataSource<any> {
  constructor(private orderService: OrderService) {
    super();
  }
  connect(): Observable<Order[]> {
    return this.orderService.getItems();
  }
  disconnect(): void { }
}
