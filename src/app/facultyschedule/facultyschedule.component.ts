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
  sunday: string;
  [key: string]: string;
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
  timeSlots: string[] = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];

  constructor(private http: HttpClient) {
    this.getFacultyNames();
  }

  getFacultyNames() {
    this.http.get<string[]>('https://cmkis.online/backend/getfacultyusers.php').subscribe(
      response => {
        console.log(response);
        this.facultyNames = response;
        if (this.facultyNames.length > 0) {
          this.facultyName = this.facultyNames[0];
          this.getSchedule();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getSchedule() {
    this.http.get<{ success: boolean, schedules: Schedule[] }>(`https://cmkis.online/backend/getschedule.php?faculty_name=${this.facultyName}`).subscribe(
      response => {
        console.log(response);
        if (response.success && response.schedules.length > 0) {
          const scheduleText = response.schedules[0].schedule_data;
          const scheduleDataObj = JSON.parse(scheduleText);
          this.scheduleData = [];
          for (const day in scheduleDataObj) {
            if (scheduleDataObj.hasOwnProperty(day)) {
              const dayData = scheduleDataObj[day];
              for (const time in dayData) {
                if (dayData.hasOwnProperty(time)) {
                  const timeData = dayData[time];
                  const schedule: ScheduleData = {
                    time,
                    monday: '',
                    tuesday: '',
                    wednesday: '',
                    thursday: '',
                    friday: '',
                    saturday: '',
                    sunday: ''
                  };
                  schedule[day] = `${timeData.subject} (${timeData.room})`;
                  this.scheduleData.push(schedule);
                }
              }
            }
          }
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
