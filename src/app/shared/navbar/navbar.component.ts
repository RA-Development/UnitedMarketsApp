import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'United Markets Administration';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isAdministration(): boolean {
    return this.router.url.includes('manage');
  }

  isLoggedIn(): boolean{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return true;
    }
  }
}
