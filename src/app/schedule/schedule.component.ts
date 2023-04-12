import { Component } from '@angular/core';
interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;}



  interface EventItem {
    date: Date;
    time: string;
    event: string;
  }
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  newDate: Date;

  constructor() {
    this.newDate = new Date(); // initialize newDate with the current date in the constructor
  }
  newTime: string = '';
  newEvent: string = '';
  isSideBarCollapsed = false;
  screenWidth = 0;

  onToggleSideBar(): void {
 ;
  }

  events: EventItem[] = [];

  addEvent(date: Date, time: string, event: string) {
    const newItem: EventItem = { date, time, event };
    this.events.push(newItem);
  }

  deleteEvent(index: number) {
    this.events.splice(index, 1);
  }

}
