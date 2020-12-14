import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './login-admin/auth.guard';
import {OrderItemComponent} from './orders/order-item/order-item.component';
import {OrderListComponent} from './orders/order-list/order-list.component';
import {AdminComponent} from './admin/admin.component';

const appRoutes: Routes = [
  { path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard], },
      { path: 'order/:id', component: OrderItemComponent, canActivate: [AuthGuard], }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]

})
export class AdminRoutingModule {
}
