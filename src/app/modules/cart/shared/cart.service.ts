import {Injectable} from '@angular/core';
import {Product} from '../../products/shared/product.model';
import {OrderLine} from '../../../shared/models/orderLine.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderLines: OrderLine[] = [];

  private totalPriceSubject = new BehaviorSubject<number>(this.getTotalPrice(this.loadOrderLines()));
  totalPrice$ = this.totalPriceSubject.asObservable();

  private qtySubject = new BehaviorSubject<number>(this.getTotalQuantity(this.loadOrderLines()));
  qty$ = this.qtySubject.asObservable();

  constructor() {
    this.orderLines = this.loadOrderLines();
  }

  setTotalPrice(totalPrice: number): void {
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    this.totalPriceSubject.next(JSON.parse(localStorage.getItem('totalPrice')));
  }

  setCartCount(qty: number): void {
    localStorage.setItem('qty', JSON.stringify(qty));
    this.qtySubject.next(JSON.parse(localStorage.getItem('qty')));
  }

  loadOrderLines(): OrderLine[] {
    return JSON.parse(localStorage.getItem('orderLines'));
  }

  addToCart(product: Product): void {
    const currentOrderLine = this.orderLines.find(ol => ol.product.id === product.id);
    if (currentOrderLine) {
      currentOrderLine.quantity++;
    } else {
      const freshOrderLine = new OrderLine();
      freshOrderLine.productId = product.id;
      freshOrderLine.product = product;
      freshOrderLine.quantity = 1;
      this.orderLines.push(freshOrderLine);
    }
    this.saveChanges();
  }

  removeFromCart(product: Product): void {
    const currentOrderLine = this.orderLines.find(ol => ol.product.id === product.id);
    if (currentOrderLine.quantity > 1) {
      currentOrderLine.quantity--;
    } else {
      this.orderLines.forEach((orderLine: OrderLine, index) => {
        if (orderLine === currentOrderLine) {
          this.orderLines.splice(index, 1);
        }
      });
    }
    this.saveChanges();
  }

  getTotalQuantity(orderLines: OrderLine[]): number {
    let q = 0;
    for (const orderLine of orderLines) {
      q += orderLine.quantity;
    }
    return q;
  }

  getTotalPrice(dataSource: OrderLine[]): number {
    let totalPrice = 0;
    for (const orderLine of dataSource) {
      totalPrice += orderLine.quantity * orderLine.product.price;
    }
    return totalPrice;
  }

  saveChanges(): void {
    localStorage.setItem('orderLines', JSON.stringify(this.orderLines));
    this.setCartCount(this.getTotalQuantity(this.loadOrderLines()));
    this.setTotalPrice(this.getTotalPrice(this.loadOrderLines()));
  }

  clearCart(): void {
    this.orderLines = [];
    this.saveChanges();
  }
}



