import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './componets/products/product-list/product-list.component';
import {MarketsListComponent} from './componets/markets/markets-list/markets-list.component';
import {WelcomeComponent} from './componets/welcome/welcome.component';
import {NavbarComponent} from './shared/navbar/navbar.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'markets', component: MarketsListComponent}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule {
}


