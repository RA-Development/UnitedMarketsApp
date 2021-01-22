import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../products/shared/product.model';
import {CartService} from './shared/cart.service';
import {OrderLine} from '../../shared/models/orderLine.model';
import {of, Subscription} from 'rxjs';
import {Order} from '../../admin/orders/shared/order.model';
import {catchError, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DialogService} from '../../shared/modules/dialog/dialog.service';
import {OrderService} from '../../admin/orders/shared/order.service';
import {SnackBarService} from '../../shared/services/snack-bar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'item',
    'cost per item',
    'add product',
    'quantity',
    'remove product',
    'total'];
  dataSource: OrderLine[] = [];
  totalQuantity: number;
  totalPrice: number;
  private qtySub: Subscription;
  private totalPriceSub: Subscription;

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private dialogService: DialogService,
              private route: Router,
              private snackBarService: SnackBarService
  ) {
  }

  ngOnInit(): void {
    this.dataSource = this.cartService.loadOrderLines();

    this.totalPriceSub = this.cartService.totalPrice$.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
    });

    this.qtySub = this.cartService.qty$.subscribe(qty => {
      this.totalQuantity = qty;
    });
  }


  addProduct(product: Product): void {
    this.cartService.addToCart(product);
    this.dataSource = this.cartService.loadOrderLines();
  }

  removeProduct(product: Product): void {
    this.cartService.removeFromCart(product);
    this.dataSource = this.cartService.loadOrderLines();
  }


  openDialog(): void {
    const options = {
      title: 'CHECKOUT CONFIRMATION',
      message: 'Are you sure you want to check out?',
      cancelText: 'CANCEL',
      confirmText: 'CONFIRM'
    };
    this.dialogService.open(options);

    this.dialogService.action().subscribe(response => {
      if (response === true && this.dataSource.length > 0) {
        this.placeOrder();
        this.cartService.clearCart();
      }
    });
  }

  placeOrder(): void {
    const products = this.cartService.loadOrderLines();

    for (const p of products) {
      p.subTotalPrice = p.product.price * p.quantity;
      p.product = undefined;
    }

    const order: Order = {
      products,
      billingAddress: 'Chris Hansen, Spangsbjerg Kirkevej 7, Esbjerg 6700, Denmark',
      shippingAddress: 'Chris Hansen, Spangsbjerg Kirkevej 80, Esbjerg 6700, Denmark',
      totalPrice: this.totalPrice
    };

    this.orderService.createOrder(order).subscribe(createdOrder => {
      console.log(JSON.stringify(createdOrder));
      this.snackBarService
        .showNotification(`Order #${createdOrder.id} successfully created`);
      this.route.navigateByUrl('/');
    });
  }

  ngOnDestroy(): void {
    if (this.totalPriceSub) {
      this.totalPriceSub.unsubscribe();
    }
    if (this.qtySub) {
      this.qtySub.unsubscribe();
    }
  }


}
