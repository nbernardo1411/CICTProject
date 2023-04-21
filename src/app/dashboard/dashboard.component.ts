import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface Key {
  id: number;
  name: string;
  room: string;
  borrowed: boolean;
  borrowedBy: string | null;
  borrowedAt: string | null;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  keys: Key[] = [];

  currentDate: Date = new Date();
  isSideBarCollapsed = false;
  screenWidth = 0;

  keyName: string = '';
  borrowerName: string = '';
  borrowedAt: string = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchKeys();
  }

  fetchKeys() {
    this.http.get<Key[]>('http://localhost/CICTProject/src/index.php?borrowed=true').subscribe(
      keys => {
        this.keys = keys;
      },
      error => {
        console.log(error);
      }
    );
  }

  onToggleSideBar(): void {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
  }

  showDetails(key: Key): void {
    this.keyName = key.name;
    this.borrowerName = key.borrowedBy || 'N/A';
    this.borrowedAt = key.borrowedAt || 'N/A';
  }
}
