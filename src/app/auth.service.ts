import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
    console.log('authToken saved:', token);
  }

  clearAuthToken(): void {
    localStorage.removeItem('authToken');
  }

  login(userId: string, authToken: string): void {
    console.log('authToken received:', authToken);
    console.log('userId:', userId);
    this.userService.setCurrentUser(userId);
    this.setAuthToken(authToken);
    this.router.navigate(['/facultyhome']);
  }

  logout(): void {
    this.userService.setCurrentUser('');
    this.clearAuthToken();
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    const userId = this.userService.getCurrentUser();
    console.log('current user in auth service:', userId);
    return !!userId && !!this.getAuthToken();
  }

  getCurrentUser(): string {
    return this.userService.getCurrentUser();
  }
}
