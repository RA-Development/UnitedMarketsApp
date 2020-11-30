import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {MarketService} from '../../shared/services/market.service';
import {Market} from '../../shared/models/market.model';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-markets-tiles',
  templateUrl: './markets-tiles.component.html',
  styleUrls: ['./markets-tiles.component.css']
})
export class MarketsTilesComponent implements OnInit {
  title = 'United Markets';
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
}
