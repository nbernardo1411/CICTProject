import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './admin/component/login/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      // user is authenticated, allow access
      return true;
    } else {
      // user is not authenticated, redirect to login page
      this.router.navigate(['/home']);
      return false;
    }
  }
}
