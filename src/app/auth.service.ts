import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

interface User {
  id_number: string;
  auth_token: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<string>('');

  constructor(private router: Router, private userService: UserService) {}

  get currentUser$() {
    return this.currentUserSubject.asObservable();
  }

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

  login(response: ApiResponse): void {
    console.log('API response:', response);
    const { success, message, user } = response;
    if (success) {
      const { id_number, auth_token } = user;
      console.log('authToken received:', auth_token);
      console.log('userId:', id_number);
      this.setAuthToken(auth_token);
      this.userService.setUser(id_number);
      this.updateCurrentUser(id_number);
      this.router.navigate(['/facultyhome']);
    } else {
      console.log('Login failed:', message);
    }
  }

  logout(): void {
    this.updateCurrentUser('');
    this.clearAuthToken();
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    const userId = this.currentUserSubject.getValue();
    console.log('current user in auth service:', userId);
    return !!userId && !!this.getAuthToken();
  }

  updateCurrentUser(userId: string) {
    console.log('Setting current user:', userId);
    if (userId) {
      this.currentUserSubject.next(userId);
      localStorage.setItem('currentUser', userId);
      console.log('current user set to:', userId);
    } else {
      console.log('userId is undefined or null');
    }
  }
}
