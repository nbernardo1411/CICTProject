import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  getCurrentUser(): string {
    const userId = localStorage.getItem('currentUser');
    const authToken = localStorage.getItem('authToken');
    console.log('current user:', userId, 'auth token:', authToken);
    return userId ? userId : '';
  }


  setCurrentUser(userId: string): void {
    localStorage.setItem('currentUser', userId);
    console.log('current user set to:', userId);
  }

}
