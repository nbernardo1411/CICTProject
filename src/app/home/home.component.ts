import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  onLogin() {
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);

    this.http.post<any>('http://localhost/CICTProject/src/login.php', formData).subscribe(
      response => {
        if (response.success) {
          // User is authenticated, log in and redirect to dashboard
          this.authService.login(response.userId);
          this.router.navigate(['/facultyhome']);
        } else {
          // Authentication failed, display error message
          this.errorMessage = 'Incorrect email or password.';
        }
      },
      error => {
        // Handle errors
        console.error(error);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
