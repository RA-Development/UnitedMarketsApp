import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../products/shared/product.model';
import {CartService} from './shared/cart.service';
import {OrderLine} from '../../shared/models/orderLine.model';
import {of, Subscription} from 'rxjs';
import {Order} from '../../shared/models/order.model';
import {catchError, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

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
  subTotalPrice: number;
  private countSub: Subscription;
  private subTotalSub: Subscription;
  private err: undefined;

  constructor(private cartService: CartService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private route: Router
  ) {
    this.dataSource = this.cartService.loadOrderLines();

    if (this.dataSource) {
      this.totalQuantity = this.cartService.getTotalQuantity(this.dataSource);
      this.subTotalPrice = this.cartService.getTotalPrice(this.dataSource);
    }

    this.subTotalSub = this.cartService.subTotalPrice$.subscribe(subTotal => {
      this.subTotalPrice = subTotal;
    });

    this.countSub = this.cartService.qty$.subscribe(qty => {
      this.totalQuantity = qty;
    });
  }

  ngOnInit(): void {
  }


  addProduct(product: Product): void {
    this.cartService.addToCart(product);
    this.dataSource = this.cartService.loadOrderLines();
  }

  removeProduct(product: Product): void {
    this.cartService.removeFromCart(product);
    this.dataSource = this.cartService.loadOrderLines();
  }


  placeOrder(): void {
    const products = this.cartService.loadOrderLines();
    const totalPrice = this.cartService.getTotalPrice(this.dataSource);

    for (const p of products) {
      p.subTotalPrice = p.product.price * p.quantity;
      p.product = undefined;
    }

    const order: Order = {
      products,
      billingAddress: 'Chris Hansen, Spansbjerg Kirkevej 7, Esbjerg 6700, Denmark',
      shippingAddress: 'Chris Hansen, Spansbjerg Kirkevej 80, Esbjerg 6700, Denmark',
      orderStatusId: 4,
      totalPrice
    };

    this.cartService.createOrder(order)
      .pipe(
        tap(() => this.err = undefined),
        catchError(err => {
          this.err = err.error ?? err.message;
          console.log(this.err);
          return of([]);
        })
      )
      .subscribe(createdOrder => {
        console.log(JSON.stringify(createdOrder));
        this.cartService.clearCart();
        this.route.navigateByUrl('/');

      });
  }

  ngOnDestroy(): void {
    if (this.subTotalSub) {
      this.subTotalSub.unsubscribe();
    }
    if (this.countSub) {
      this.countSub.unsubscribe();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true' && this.dataSource.length > 0) {
        this.placeOrder();

        // this.cartService.clearCart();
        this.snackBar.open('Order Successfully created.', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          politeness: 'assertive'
        });
      }
    });

  }
}
