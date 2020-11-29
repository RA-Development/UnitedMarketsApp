import { Component, OnInit } from '@angular/core';
import {MarketService} from '../../shared/services/market.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(private marketService: MarketService) { }

  ngOnInit(): void {
  }

}
