import {Component, OnInit} from '@angular/core';
import {Product} from '../products/shared/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productCart: Product[] = [
    {id: 1, name: 'product 1'},
    {id: 2, name: 'product 2'},
    {id: 3, name: 'product 3'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
