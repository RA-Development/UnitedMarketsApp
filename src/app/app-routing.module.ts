import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {MarketComponent} from './components/market/market.component';
import {LoginAdminComponent} from './components/login-admin/login-admin.component';
import {AuthGuard} from './components/login-admin/auth.guard';
import {OrderListComponent} from './components/orders/order-list.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'market/:id', component: MarketComponent},
  { path: 'manage/login', component: LoginAdminComponent },
  { path: 'manage/orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'manage', redirectTo: 'manage/login' }
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
