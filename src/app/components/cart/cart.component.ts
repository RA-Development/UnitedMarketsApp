import {Component, OnInit} from '@angular/core';
import {Product} from '../products/shared/product.model';
import {CartService} from './shared/cart.service';
import {OrderLine} from '../../shared/models/orderLine.model';
import {count} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = [
    'item',
    'cost per item',
    'add product',
    'quantity',
    'remove product',
    'total'];

  dataSource: OrderLine[];
  totalQuantity: number;
  subTotalPrice: number;
  private countSub: Subscription;
  private subTotalSub: Subscription;

  constructor(private cartService: CartService) {
    this.dataSource = this.cartService.loadOrderLines();
    //  extra
    this.totalQuantity = this.cartService.getTotalQuantity(this.dataSource);
    this.subTotalPrice = this.cartService.getSubTotalPrice(this.dataSource);

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
}
