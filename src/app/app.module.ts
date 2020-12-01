import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MarketsListComponent } from './components/markets/markets-list/markets-list.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarketsTilesComponent } from './components/markets/markets-tiles/markets-tiles.component';
import { MarketComponent } from './components/market/market.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MarketsListComponent,
    NavbarComponent,
    WelcomeComponent,
    MarketsTilesComponent,
    MarketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
