import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    const userId = localStorage.getItem('currentUser');
    if (userId) {
      this.currentUserSubject.next(userId);
    }
  }

  getCurrentUser(): string | null {
    const userId = this.currentUserSubject.getValue();
    const authToken = localStorage.getItem('authToken');
    console.log('current user:', userId, 'auth token:', authToken);
    return userId;
  }

  setUser(userId: string): void {
    localStorage.setItem('currentUser', userId);
    console.log('Current user saved to local storage:', userId);
    this.currentUserSubject.next(userId);
    console.log('Current user set in BehaviorSubject:',
    this.currentUserSubject.getValue());
  }

  getCurrentUser$() {
    return this.currentUserSubject.asObservable();
  }
}
