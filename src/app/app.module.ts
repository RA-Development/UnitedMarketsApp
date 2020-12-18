import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ProductListComponent} from './modules/products/product-list/product-list.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './modules/welcome/welcome.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {MarketTilesComponent} from './modules/markets/market-tiles/market-tiles.component';
import {MarketComponent} from './modules/market/market.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ProductItemComponent} from './modules/products/product-item/product-item.component';
import {CartComponent} from './modules/cart/cart.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {AuthGuard} from './admin/login-admin/auth.guard';
import {AuthenticationService} from './admin/login-admin/authentication.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AdminModule} from './admin/admin.module';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogComponent} from './modules/dialog/dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DialogModule} from './modules/dialog/dialog.module';

@NgModule({
  entryComponents: [
    DialogComponent
  ],
  declarations: [
    AppComponent,
    ProductListComponent,
    WelcomeComponent,
    NavbarComponent,
    MarketTilesComponent,
    MarketComponent,
    ProductItemComponent,
    CartComponent
  ],
  imports: [
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,

    MatSelectModule, // select box
    MatTooltipModule,
    DialogModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
