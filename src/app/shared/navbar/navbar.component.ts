import {Component, OnInit} from '@angular/core';
import {CartService} from '../../modules/cart/shared/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  titleWebStore = 'United Markets';

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {

  }
}
