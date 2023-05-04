import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-facultyhome',
  templateUrl: './facultyhome.component.html',
  styleUrls: ['./facultyhome.component.css']
})
export class FacultyhomeComponent implements OnInit {
  currentUser: any;

  constructor(
    private router: Router,
    public authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser$().subscribe(user => {
      if (user) {
        this.currentUser = user.name;
      }
    });
  }




  logout() {
    // clear user authentication data and redirect to login page
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
