import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  email = '';
  password = '';
  errorMessage = '';
  showPassword = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private userService: UserService) {}

  onLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    const formData = new FormData();
formData.set('email', this.email);
formData.set('password', this.password);


    console.log('formData:', formData); // log the formData object to see if it's correctly set

    this.http.post<any>('http://localhost/CICTProject/src/login.php', formData).subscribe(
      response => {
        console.log('API response:', response);

        if (response.success) {
          // User is authenticated, log in and redirect to dashboard
          this.authService.login(response);
          this.userService.setUser(response.userId);
          this.router.navigate(['/facultyhome']);
        } else {
          // Authentication failed, display error message
          this.errorMessage = 'Incorrect email or password.';
        }
      },
      error => {
        // Log the error
        console.error(error);

        // Display error message
        this.errorMessage = 'An error occurred while logging in. Please try again later.';
      }
    );
  }



  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
