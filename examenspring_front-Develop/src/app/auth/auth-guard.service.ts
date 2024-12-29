import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {  // Specify return type
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      return true;
    } else {
      return this.router.parseUrl('/');
    }
  }

  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      // Allow access to all pages except the home page
      if (state.url !== '/list-arbitre' && state.url !== '/list-equipe') {
        return true;
      } else {
        // Redirect to another page (e.g., /dashboard) if trying to access the home page
        return this.router.parseUrl('/home');
      }
    } else {
      // Redirect to the login page if not authenticated
      return this.router.parseUrl('/');
    }
  }*/
}
