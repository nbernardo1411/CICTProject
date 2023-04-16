import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';

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
export class ScheduleComponent  {
  @ViewChild('scheduleTable') scheduleTable!: ElementRef;


  days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  timeSlots = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];
  facultyName: string = '';
  schedule: Schedule = {
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {}
  };

  editSchedule(timeSlot: string, day: string, facultyName: string) {
    const subject = prompt('Enter subject:');
    const room = prompt('Enter room:');
    if (subject && room) {
      this.schedule[day][timeSlot] = { subject, room, faculty: facultyName };
    } else {
      delete this.schedule[day][timeSlot];
    }
  }

  onToggleSideBar(): void {
    // add your implementation here
  }

  assignSchedule() {
    // Call a backend API or database to store the schedule for the faculty
    console.log(`Schedule assigned to ${this.facultyName}: `, this.schedule);
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
