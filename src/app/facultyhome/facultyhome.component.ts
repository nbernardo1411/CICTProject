import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-facultyhome',
  templateUrl: './facultyhome.component.html',
  styleUrls: ['./facultyhome.component.css']
})
export class FacultyhomeComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    // clear user authentication data and redirect to login page
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
