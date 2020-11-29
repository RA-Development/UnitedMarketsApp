import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarketsListComponent} from './markets/markets-list/markets-list.component';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {NavbarComponent} from './shared/navbar/navbar.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'markets', component: MarketsListComponent}
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
