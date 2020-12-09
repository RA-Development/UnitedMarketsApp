import {Component, OnInit} from '@angular/core';
import {CartService} from '../../components/cart/shared/cart.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'United Markets';


  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }


}
