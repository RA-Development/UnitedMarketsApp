import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {OrderService} from '../shared/order.service';
import {AuthenticationService} from '../../login-admin/authentication.service';
import {DataSource} from '@angular/cdk/collections';
import {Order} from '../../../shared/models/order.model';
import {catchError, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogService} from '../../../modules/dialog/dialog.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[];
  err: any;
  displayedColumns: string[] = ['id', 'date', 'price', 'status', 'actions'];
  dataSource = new OrderDataSource(this.orderService);
  currentEntity: any;

  constructor(private orderService: OrderService,
              private router: Router,
              private authService: AuthenticationService,
              private dialogService: DialogService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // TODO: Replace!
    this.orderService.getOrders()
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

  openDialog(order: Order): void {
    const options = {
      title: 'DELETE CONFIRMATION',
      message: 'Are you sure you want to delete this order?',
      cancelText: 'CANCEL',
      confirmText: 'CONFIRM'
    };
    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed === true && order != null) {
        this.delete(order);

        // this.cartService.clearCart();
        this.snackBar.open('Order successfully deleted.', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          politeness: 'assertive'
        });
      }
    });
  }

  delete(order: Order): void {
    this.orderService.delete(order.id)
      .pipe(
        tap(() => this.orderService.getOrders()),
        catchError(err => {
          return err;
        })
      ).subscribe(() => {
      document.location.reload();
    });
  }
}
export class OrderDataSource extends DataSource<any> {
  constructor(private orderService: OrderService) {
    super();
  }
  connect(): Observable<Order[]> {
    return this.orderService.getOrders();
  }
  disconnect(): void { }
}
