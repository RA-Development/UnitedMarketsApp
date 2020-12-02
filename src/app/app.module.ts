import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ProductListComponent} from './components/products/product-list/product-list.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {MarketListComponent} from './components/markets/market-list/market-list.component';
import {MarketTilesComponent} from './components/markets/market-tiles/market-tiles.component';
import {MarketComponent} from './components/market/market.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    MarketListComponent,
    WelcomeComponent,
    NavbarComponent,
    MarketTilesComponent,
    MarketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
