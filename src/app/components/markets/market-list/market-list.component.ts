import {Component, OnInit} from '@angular/core';
import {Market} from '../shared/market.model';
import {MarketService} from '../shared/market.service';
import {Observable, of} from 'rxjs';
import {catchError, switchMap, take, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.css']
})
export class MarketListComponent implements OnInit {
  markets$: Observable<Market[]>;
  id: number;
  err: string;

  constructor(private marketService: MarketService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.markets$ = this.route.paramMap
      .pipe(
        take(1),
        switchMap(params => {
          this.id = +params.get('id');
          return this.marketService.getMarkets();
        }),
        tap(() => this.err = undefined),
        catchError(err => {
          this.err = err.error ?? err.message;
          document.getElementById('p1').innerHTML = 'Loading error...';
          return of([]);
        })
      );
  }

  initProducts(event): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl('market/' + event);
  }
}
