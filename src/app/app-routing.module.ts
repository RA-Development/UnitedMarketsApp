import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarketsListComponent} from './components/markets/markets-list/markets-list.component';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {MarketComponent} from './components/market/market.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'market/:id', component: MarketComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
