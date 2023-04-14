import { Component } from '@angular/core';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface Attendance {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  isSideBarCollapsed = false;
  screenWidth = 0;
  onToggleSideBar(): void {
    // Add implementation for the method here
  }
  editingAttendance: Attendance | null = null; // property to keep track of the faculty being edited

  attendanceList: Attendance[] = [

  ];

  addAttendance() {
    const newAttendance: Attendance = {
      id: 0,
      name: '',
      email: ''
    };
    this.editingAttendance = newAttendance;
    this.attendanceList.push(newAttendance);
  }

  editAttendance(attendance: Attendance) {
    this.editingAttendance = attendance; // set the faculty being edited
    this.id = attendance.id;
    this.name = attendance.name;
    this.email = attendance.email;
  }

  saveAttendance() {
    if (this.editingAttendance) {
      // update the faculty being edited with the new values
      this.editingAttendance.id = this.id!;
      this.editingAttendance.name = this.name!;
      this.editingAttendance.email = this.email!;
      this.editingAttendance = null; // reset the editing faculty
      this.id = undefined;
      this.name = undefined;
      this.email = undefined;
    }
  }

  cancelEdit() {
    this.editingAttendance = null; // reset the editing faculty
    this.id = undefined;
    this.name = undefined;
    this.email = undefined;
  }

  deleteAttendance(attendance: Attendance) {
    const index = this.attendanceList.indexOf(attendance);
    if (index !== -1) {
      this.attendanceList.splice(index, 1);
    }
  }
}
