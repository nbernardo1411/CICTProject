import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface Schedule {
  [key: string]: { [key: string]: { subject: string, room: string, faculty: string } };
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @ViewChild('scheduleTable') scheduleTable!: ElementRef;
  facultyList: string[] = [];
  name: string = '';
  selectedFaculty: string = '';

  days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  timeSlots = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];
  schedule: Schedule = {
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {}
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getFacultyList();
  }

  getFacultyList() {
    // Send HTTP GET request to API endpoint to get the list of faculties
    this.http.get<any>('https://cmkis.online/backend/assign-schedule.php').subscribe(
      response => {
        this.facultyList = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  editSchedule(timeSlot: string, day: string, name: string) {
    const subject = prompt('Enter subject:');
    const room = prompt('Enter room:');
    if (subject && room) {
      this.schedule[day][timeSlot] = { subject, room, faculty: name };
    } else {
      delete this.schedule[day][timeSlot];
    }
  }

  onToggleSideBar(): void {
    // add your implementation here
  }

  assignSchedule() {
    this.selectedFaculty = this.name;
    // Call a backend API or database to store the schedule for the faculty
    console.log(`Schedule assigned to ${this.name}: `, this.schedule);
    this.http.post<any>('https://cmkis.online/backend/schedules.php', {
      name: this.name,
      schedule: this.schedule
    }).subscribe(
      response => {
        console.log(response);
        if (response.success) {
          alert('Schedule assigned successfully!');
        } else {
          alert('An error occurred while assigning schedule. Please try again later.');
        }
      },
      error => {
        console.log(error);
        alert('An error occurred while assigning schedule. Please try again later.');
      }
    );
  }

  clearTable() {
    this.schedule = {
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {}
    };
  }

  saveAsImage() {
    html2canvas(this.scheduleTable.nativeElement).then(canvas => {
      const link = document.createElement('a');
      link.download = 'schedule.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

}
