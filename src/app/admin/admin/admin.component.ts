import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../login-admin/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  titleAdministration = 'United Markets Administration';
  isExpanded = false;
  element: HTMLElement;
  contentSelected = false;
  err: string;
  username: string;

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  toggleActive(event: any): void{
    event.preventDefault();
    if (this.element !== undefined){
      this.element.style.backgroundColor = 'white';
    }
    const target = event.currentTarget;
    target.style.backgroundColor = 'gold';
    this.element = target;
  }

  navigateToSelection(): void {
    this.contentSelected = true;
  }

  isAuthenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.username = this.authService.getUsername();
      return true;
    }
  }

  navigateToLoginPage(): void {
    this.authService.logout();
  }
}
