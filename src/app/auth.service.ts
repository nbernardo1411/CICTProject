import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly localStorageKey = 'userId';

  constructor() {}

  login(userId: string) {
    localStorage.setItem(this.localStorageKey, userId);
  }

  logout() {
    localStorage.removeItem(this.localStorageKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.localStorageKey) !== null;
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.localStorageKey);
  }

}
