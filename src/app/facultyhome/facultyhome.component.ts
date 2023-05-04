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
 imageUrl!: string; // Add the ! operator to indicate it will be initialized later
  altText = 'Profile Picture';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
    }
  }
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
