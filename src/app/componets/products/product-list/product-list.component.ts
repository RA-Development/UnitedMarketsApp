import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../shared/product.model';
import {FilteredList} from '../../../shared/models/filteredList.model';
import {ProductService} from '../shared/product.service';
import {Filter} from '../../../shared/models/filter.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  filteredList$: Observable<FilteredList<Product>>;
  filter: Filter = {
    currentPage: 0,
    itemsPerPage: 0,
    searchField: '',
    searchValue: '',
    marketId: 1
  };

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.filteredList$ = this.productService.getFilteredList(this.filter);
  }

}
