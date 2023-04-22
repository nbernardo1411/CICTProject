import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Schedule {
  faculty_name: string;
  schedule_data: any;
}

export interface ScheduleData {
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string; // Define the `time` property on the `ScheduleData` type
}

@Component({
  selector: 'app-facultyschedule',
  templateUrl: './facultyschedule.component.html',
  styleUrls: ['./facultyschedule.component.css']
})
export class FacultyscheduleComponent {
  facultyName = '';
  scheduleData: ScheduleData[] = [];
  facultyNames: string[] = [];
  facultySchedules: ScheduleData[] = [];

  constructor(private http: HttpClient) {
    this.getFacultyNames();
  }

  getFacultyNames() {
    this.http.get<string[]>('http://localhost/CICTProject/src/getfacultyusers.php').subscribe(
      response => {
        console.log(response);
        this.facultyNames = response;
        if (this.facultyNames.length > 0) {
          this.facultyName = this.facultyNames[0];
          this.getSchedule(); // call the getSchedule function here
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getSchedule() {
    this.http.get<{ success: boolean, schedules: Schedule[] }>(`http://localhost/CICTProject/src/getschedule.php?faculty_name=${this.facultyName}`).subscribe(
      response => {
        console.log(response);
        if (response.success && response.schedules.length > 0) {
          const scheduleObj = JSON.parse(response.schedules[0].schedule_data);
          this.scheduleData = Object.values(scheduleObj);
        } else {
          this.scheduleData = [];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
