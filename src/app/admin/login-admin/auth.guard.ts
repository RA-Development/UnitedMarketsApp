import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getToken()) {
      // Logged in so return true
      return true;
    }

    // Not logged in so redirect to login page with the return url
    this.router.navigate(['/admin/'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
