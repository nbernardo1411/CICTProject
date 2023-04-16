import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string = ''; // initialize the property
  public password: string = '';
  public errorMessage: string | null = null; // change type to string | null

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  public onSubmit(): void {
    const loginResult = this.authService.login(this.username, this.password);
    if (loginResult === null) { // check for null explicitly
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = loginResult;
    }
  }
  onLogout(): void {
    this.authService.logout();
  }
}
