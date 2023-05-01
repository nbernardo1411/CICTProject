import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Attendance {
  id: number;
  user_id: number;
  name: string;
  date: string;
  room: string;
  status: string;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceData: Attendance[] = [];
  isSideBarCollapsed = false;
  filteredAttendanceData: Attendance[] = [];
  filterName = '';
  sortBy = 'date';
  sortOrder = 'asc';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
    const currentUser$ = this.authService.currentUser$;
    currentUser$.subscribe(currentUser => {
      if (!currentUser || (currentUser as any).type !== 'attendancechecker') {
        console.error('User is not authorized to access attendance data.');
        // Show error message here
      }
    });
  }
  ngOnInit(): void {
    this.fetchAttendance();
  }

  fetchAttendance(): void {
    this.http.get<Attendance[]>('https://cmkis.online/backend/getattendance.php').subscribe(
      response => {
        this.attendanceData = response;
        this.filteredAttendanceData = response;
        this.sortAttendanceData();
        this.filterAttendanceData();
      },
      error => {
        console.log(error);
      }
    );
  }

  sortAttendanceData(): void {
    if (this.sortBy === 'date') {
      this.filteredAttendanceData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return this.sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      });
    } else if (this.sortBy === 'name') {
      this.filteredAttendanceData.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return this.sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
    }
  }

  filterAttendanceData(): void {
    if (this.filterName.trim() !== '') {
      this.filteredAttendanceData = this.attendanceData.filter(data =>
        data.name.toLowerCase().includes(this.filterName.trim().toLowerCase())
      );
    } else {
      this.filteredAttendanceData = this.attendanceData;
    }
    this.sortAttendanceData();
  }

  onToggleSideBar(): void {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
  }
}
