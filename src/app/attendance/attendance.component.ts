import { Component } from '@angular/core';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface Attendance {
  date: Date;
  name: string;
  faculty: string;
  section: string;
  room: string;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  date: Date;
  name: string | undefined;
  faculty: string | undefined;
  section: string | undefined;
  room: string | undefined;
  isSideBarCollapsed = false;
  screenWidth = 0;
  onToggleSideBar(): void {
    // Add implementation for the method here
  }
  editingAttendance: Attendance | null = null; // property to keep track of the faculty being edited

  attendanceList: Attendance[] = [

  ];

  constructor() {
    this.date = new Date();

  }

  public formatDate(date: Date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined);
  }
  

  
  addAttendance() {
    const newAttendance: Attendance = {
      date: new Date(),
      name: '',
      faculty: '',
      section: '',
      room: ''
    };
    this.editingAttendance = newAttendance;
    this.attendanceList.push(newAttendance);
  }
  

  editAttendance(attendance: Attendance) {
    this.editingAttendance = attendance; // set the faculty being edited
    this.date = attendance.date;
    this.name = attendance.name;
    this.faculty = attendance.faculty;
    this.section = attendance.section;
    this.room = attendance.room;
  }

  saveAttendance() {
    if (this.editingAttendance) {
      // update the faculty being edited with the new values
      this.editingAttendance.date = this.date!;
      this.editingAttendance.name = this.name!;
      this.editingAttendance.faculty = this.faculty!;
      this.editingAttendance.section = this.section!;
      this.editingAttendance.room = this.room!;
      this.editingAttendance = null; // reset the editing faculty
      this.date = new Date();
      this.name = undefined;
      this.faculty = undefined;
      this.section = undefined;
      this.room = undefined;
    }
  }

  cancelEdit() {
    this.editingAttendance = null; // reset the editing faculty
    this.date = new Date();
    this.name = undefined;
    this.faculty = undefined;
    this.section = undefined;
    this.room = undefined;
  }

  deleteAttendance(attendance: Attendance) {
    const index = this.attendanceList.indexOf(attendance);
    if (index !== -1) {
      this.attendanceList.splice(index, 1);
    }
  }
}
