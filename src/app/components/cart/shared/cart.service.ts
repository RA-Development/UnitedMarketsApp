import {Injectable} from '@angular/core';
import {CartItem} from '../../../shared/models/cartItem.model';
import {Product} from '../../products/shared/product.model';
import {OrderLine} from '../../../shared/models/orderLine.model';
import {element} from 'protractor';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  orderLines: OrderLine[] = [];
  private subTotalPrice = new Subject<number>();
  subTotalPrice$ = this.subTotalPrice.asObservable();
  private qty = new Subject<number>();
  qty$ = this.qty.asObservable();

  constructor() {
    const loadedOrderLines = this.loadOrderLines();
    this.orderLines = loadedOrderLines ? loadedOrderLines : [];

    this.setCartCount(this.getTotalQuantity(this.orderLines));
    this.setTotalPrice(this.getSubTotalPrice(this.orderLines));
  }

  setTotalPrice(totalPrice: number): void {
    localStorage.setItem('subTotal', JSON.stringify(totalPrice));
    this.subTotalPrice.next(JSON.parse(localStorage.getItem('subTotal')));
  }

  setCartCount(qty: number): void {
    localStorage.setItem('qty', JSON.stringify(qty));
    this.qty.next(JSON.parse(localStorage.getItem('qty')));
  }

  loadOrderLines(): OrderLine[] {
    return JSON.parse(localStorage.getItem('orderLines'));
  }

  addToCart(product: Product): void {
    this.loadOrderLines();
    const currentOrderLine = this.orderLines.find(ol => ol.product.id === product.id);
    if (this.orderLines && currentOrderLine) {
      currentOrderLine.quantity++;
    } else {
      const freshOrderLine = new OrderLine();
      {
        freshOrderLine.productId = product.id;
        freshOrderLine.product = product;
        freshOrderLine.quantity = 1;
      }
      this.orderLines.push(freshOrderLine);

    }
    this.saveChanges();
    this.setCartCount(this.getTotalQuantity(this.loadOrderLines()));
    this.setTotalPrice(this.getSubTotalPrice(this.loadOrderLines()));
  }

  removeFromCart(product: Product): void {
    const currentOrderLine = this.orderLines.find(ol => ol.product.id === product.id);
    this.loadOrderLines();

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
    this.setCartCount(this.getTotalQuantity(this.loadOrderLines()));
    this.setTotalPrice(this.getSubTotalPrice(this.loadOrderLines()));
  }

  getTotalQuantity(orderLines: OrderLine[]): number {
    let q = 0;
    for (const orderLine of orderLines) {
      q += orderLine.quantity;
    }
    return q;
  }

  saveChanges(): void {
    localStorage.setItem('orderLines', JSON.stringify(this.orderLines));
  }


  getSubTotalPrice(dataSource: OrderLine[]): number {
    let subTotalPrice = 0;
    for (const orderLine of dataSource) {
      subTotalPrice += orderLine.quantity * orderLine.product.price;
    }
    return subTotalPrice;
  }
}



