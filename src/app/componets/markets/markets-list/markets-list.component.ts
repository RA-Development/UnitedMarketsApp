import { Component, OnInit } from '@angular/core';
import {Market} from '../shared/market.model';
import {MarketService} from '../shared/market.service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-markets-list',
  templateUrl: './markets-list.component.html',
  styleUrls: ['./markets-list.component.css']
})
export class MarketsListComponent implements OnInit {
  markets$: Observable<Market[]>;
  err: string;
  constructor(private marketService: MarketService) { }

  ngOnInit(): void {
    this.markets$ = this.marketService.getMarkets()
      .pipe(
        tap(() => this.err = undefined ),
        catchError(err => {
          this.err = err.error ?? err.message;
          document.getElementById('p1').innerHTML = 'Loading error...';
          return of([]);
        })
      );
      // .subscribe(listOfMarkets => this.markets = listOfMarkets);
  }

  myFunc(event): void {
    console.log(event.currentTarget.value);
  }
}
