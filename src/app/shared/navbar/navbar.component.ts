import {Component, OnInit} from '@angular/core';
import {CartService} from '../../components/cart/shared/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  titleAdministration = 'United Markets Administration';
  titleWebStore = 'United Markets';

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
  }

  isAdministration(): boolean {
    return this.router.url.includes('manage');
  }

  isLoggedIn(): boolean{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.isAdministration() && currentUser) {
      return true;
    }
  }
}
