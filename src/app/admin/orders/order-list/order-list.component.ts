import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {OrderService} from '../shared/order.service';
import {AuthenticationService} from '../../login-admin/authentication.service';
import {DataSource} from '@angular/cdk/collections';
import {Order} from '../../../shared/models/order.model';
import {OrderStatus} from '../../../shared/models/orderStatus.model';
import {StatusService} from '../../../shared/status.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[];
  statuses: OrderStatus[];
  err: string;
  displayedColumns: string[] = ['id', 'date', 'price', 'status'];
  dataSource = new OrderDataSource(this.orderService);
  currentEntity: any;

  constructor(private orderService: OrderService,
              private statusService: StatusService,
              private router: Router,
              private authService: AuthenticationService,
              private snackBar: MatSnackBar) {
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

    this.statusService.getStatuses()
      .subscribe(
        response => {
          this.statuses = response;
          console.log(this.statuses);

        }
      );

  }

  onRowClicked(row): void {
    console.log(row.valueOf());
    this.router.navigateByUrl('admin/order/' + row.valueOf().id);
  }


  updateOrder(order: Order): void {
    this.orderService.updateOrder(order).subscribe(
      response => {
        console.log(response);
        this.snackBar.open('Status of order #' + response.id + ' was successfully updated.', '', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          politeness: 'polite',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
      }
    );
  }
}

export class OrderDataSource extends DataSource<any> {
  constructor(private orderService: OrderService) {
    super();
  }

  connect(): Observable<Order[]> {
    return this.orderService.getItems();
  }

  disconnect(): void {
  }
}
