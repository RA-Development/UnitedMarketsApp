import {Component, Input, OnInit, Output} from '@angular/core';
import {Product} from '../shared/product.model';
import {CartService} from '../../cart/shared/cart.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product;


  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {

  }

  addToCart(): void {
    this.cartService.addToCart(this.productItem);
  }

}
