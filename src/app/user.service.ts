import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface User {
  id_number: string;
  auth_token: string;
  email: string;
  type: string; // Add the `type` field
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    const userId = localStorage.getItem('currentUser');
    if (userId) {
      this.getUserData(userId).subscribe(user => {
        this.currentUserSubject.next(user);
      });
    }
  }

  getCurrentUser(): User | null {
    const user = this.currentUserSubject.getValue();
    const authToken = localStorage.getItem('authToken');
    console.log('current user:', user?.id_number, 'auth token:', authToken);
    return user;
  }

  setUser(userId: string): void {
    this.getUserData(userId).subscribe(user => {
      localStorage.setItem('currentUser', user.id_number);
      this.currentUserSubject.next(user);
    });
  }

  getCurrentUser$() {
    return this.currentUserSubject.asObservable();
  }

  private getUserData(userId: string) {
    const url = `https://cmkis.online/backend/get-user-data.php?id=${userId}`;
    return this.http.get<User>(url);
  }
  getCurrentUserType(): string | null {
    const user = this.getCurrentUser();
    return user ? user.type : null;
  }

}
