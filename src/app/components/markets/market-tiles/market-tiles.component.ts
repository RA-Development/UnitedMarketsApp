import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {MarketService} from '../shared/market.service';
import {Market} from '../shared/market.model';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-market-tiles',
  templateUrl: './market-tiles.component.html',
  styleUrls: ['./market-tiles.component.css']
})
export class MarketTilesComponent implements OnInit {
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

  selectMarket(market: Market): void {
    console.log(market);
  }
}
