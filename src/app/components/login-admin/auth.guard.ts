import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(): boolean {
    if (this.authService.getToken()) {
      // Logged in so return true
      return true;
    }

    // Not logged in so redirect to login page
    this.router.navigate(['/manage/login']);
    return false;
  }
}
