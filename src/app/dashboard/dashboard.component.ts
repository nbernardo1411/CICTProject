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

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserResponse {
  success: boolean;
  data?: User[];
  message?: string;
  total?: number;
}

interface Attendance {
  name: string;
  date: string;
  room: string;
  status: string;
}

interface AttendanceResponse {
  success: boolean;
  data?: Attendance[];
  message?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  keys: Key[] = [];
  users: User[] = [];
  userTotal: number = 0;
  attendanceData: Attendance[] = [];

  currentDate: Date = new Date();
  isSideBarCollapsed = false;
  screenWidth = 0;

  keyName: string = '';
  borrowerName: string = '';
  borrowedAt: string = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchKeys();
    this.fetchUsers();
    this.fetchAttendance();
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

  fetchUsers() {
    this.http.get<UserResponse>('http://localhost/CICTProject/src/get_users.php').subscribe(
      response => {
        if (response.success) {
          this.users = response.data || [];
          this.userTotal = response.total || 0;
        } else {
          console.log(response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchAttendance() {
    const today = new Date(); // get current date
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`; // format date as yyyy-mm-dd

    this.http.get<any[]>('http://localhost/CICTProject/src/get-attendance.php').subscribe(
      response => {
        this.attendanceData = response.filter(data => new Date(data.date).toDateString() === today.toDateString()).map(data => ({
          name: data.name,
          date: data.date,
          room: data.room,
          status: data.status
        }));
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
