import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private defaultUsername: string = 'admin';
  private defaultPassword: string = 'password';

  constructor(private router: Router) { }

  canActivate(): boolean {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  public login(username: string, password: string): string | null {
    if (username === this.defaultUsername && password === this.defaultPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      return null;
    }
    return 'Incorrect username or password';
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  public logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }
}
