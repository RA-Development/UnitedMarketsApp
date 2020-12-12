import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ProductListComponent} from './components/products/product-list/product-list.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {MarketTilesComponent} from './components/markets/market-tiles/market-tiles.component';
import {MarketComponent} from './components/market/market.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ProductItemComponent} from './components/products/product-item/product-item.component';
import {CartComponent} from './components/cart/cart.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { OrderListComponent } from './components/orders/order-list.component';
import {AuthGuard} from './components/login-admin/auth.guard';
import { AuthenticationService } from './components/login-admin/authentication.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    WelcomeComponent,
    NavbarComponent,
    MarketTilesComponent,
    MarketComponent,
    ProductItemComponent,
    CartComponent,
    LoginAdminComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,

    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
