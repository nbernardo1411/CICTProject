import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentDate = new Date();
  isSideBarCollapsed = false;
  screenWidth = 0;

  constructor(private authService: AuthService, private router: Router) {}

  onToggleSideBar(): void {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
  }
}
