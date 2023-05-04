import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

interface User {
  id_number: string;
  auth_token: string;
  email: string;
  name: any;
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
  public currentUserSubject = new BehaviorSubject<User>({id_number: '', auth_token: '', email: '', name: ''});

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
      const { name, auth_token } = user;
      console.log('authToken received:', auth_token);
      console.log('name:', name);
      this.setAuthToken(auth_token);
      this.userService.setCurrentUser(name);
      this.updateCurrentUser(user);
      this.router.navigate(['/facultyhome']);
    } else {
      console.log('Login failed:', message);
    }
  }

  logout(): void {
    this.updateCurrentUser({id_number: '', auth_token: '', email: '', name: ''});
    this.clearAuthToken();
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    const user = this.currentUserSubject.getValue();
    console.log('current user in auth service:', user);
    return !!user.name && !!this.getAuthToken();
  }

  updateCurrentUser(user: User) {
    console.log('Setting current user:', user.name);
    if (user.name) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('current user set to:', user.name);
    } else {
      console.log('name is undefined or null');
    }
  }

  getCurrentUserSubject(): BehaviorSubject<User> {
    return this.currentUserSubject;
  }
}
