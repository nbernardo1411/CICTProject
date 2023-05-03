import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface User {
  name: string;
  id_number: string;
  auth_token: string;
  email: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.getUserData(parsedUser.name).subscribe(user => {
        this.currentUserSubject.next(user);
      });
    }
  }

  getCurrentUser(): User | null {
    const user = this.currentUserSubject.getValue();
    const authToken = localStorage.getItem('authToken');
    console.log('current user:', user?.name, 'auth token:', authToken);
    return user;
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser$() {
    return this.currentUserSubject.asObservable();
  }

  private getUserData(name: string) {
    const url = `https://cmkis.online/backend/get-user-data.php?name=${name}`;
    return this.http.get<User>(url);
  }

  getCurrentUserType(): string | null {
    const user = this.getCurrentUser();
    return user ? user.type : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
