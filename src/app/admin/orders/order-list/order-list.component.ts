import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {OrderService} from '../shared/order.service';
import {AuthenticationService} from '../../login-admin/authentication.service';
import {DataSource} from '@angular/cdk/collections';
import {Order} from '../shared/order.model';
import {catchError, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogService} from '../../../shared/modules/dialog/dialog.service';
import {Status} from '../../../shared/models/status.model';
import {StatusService} from '../../../shared/services/status.service';
import {SnackBarService} from '../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[];
  err: any;
  displayedColumns: string[] = ['id', 'date', 'price', 'status', 'actions'];
  statuses: Status[];
  currentEntity: any;

  constructor(private orderService: OrderService,
              private statusService: StatusService,
              private router: Router,
              private authService: AuthenticationService,
              private dialogService: DialogService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(response => {
        this.orders = response;
      }
    );

    this.statusService.getStatuses().subscribe(response => {
        this.statuses = response;
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

    this.dialogService.action().subscribe(confirmed => {
      if (confirmed === true && order != null) {
        this.delete(order);
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


  updateOrder(order: Order): void {
    this.orderService.updateOrder(order).subscribe(
      response => {
        this.snackBarService
          .showNotification(`Status of order #${response.id} successfully updated.`);
      }
    );
  }
}


