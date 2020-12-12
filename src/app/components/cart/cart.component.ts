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
              private snackBar: MatSnackBar
  ) {
    this.dataSource = this.cartService.loadOrderLines();

    if (this.dataSource) {
      this.totalQuantity = this.cartService.getTotalQuantity(this.dataSource);
      this.subTotalPrice = this.cartService.getSubTotalPrice(this.dataSource);
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
    const totalPrice = this.cartService.getSubTotalPrice(this.dataSource);

    for (const p of products) {
      p.product = undefined;
    }

    const order: Order = {
      products,
      billingAddress: 'Esbjerg 8',
      shippingAddress: 'Esbjerg 7',
      orderStatusId: 4,
      totalPrice
    };

    this.cartService.createOrder(order)
      .pipe(
        tap(() => this.err = undefined),
        catchError(err => {
          this.err = err.error ?? err.message;
          console.log(this.err);
          console.log(() => {
            return;
          });
          return of([]);
        })
      )
      .subscribe(createdOrder => {
        console.log(JSON.stringify(createdOrder));
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
      if (result === 'true') {
        this.placeOrder();

        // this.cartService.clearCart();
        this.snackBar.open('Order Successfully created ✔.', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          politeness: 'assertive'
        });


      }
    });

  }
}
