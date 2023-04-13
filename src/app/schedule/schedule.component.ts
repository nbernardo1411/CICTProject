import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';



interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface EventItem {
  date: Date;
  time: string;
  event: string;
  description: string;
  section: string;
  location: string;
  semester: string;
}
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();

}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('myDiv') myDivRef!: ElementRef;
  @ViewChild('daysContainer') daysContainerRef!: ElementRef;

  newDate: Date;
  showForm: boolean = false;
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  calendarTitle: string = '';
  prevMonth: Date;
  nextMonth: Date;


  getDaysInMonth(year: number, month: number): number[][] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: number[][] = [];
    let week: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i).getDay();
      if (day === 0 && i !== 1) {
        days.push(week);
        week = [];
      }
      week.push(i);
    }
    if (week.length > 0) {
      days.push(week);
    }
    return days;
  }

  days: number[][];

  constructor() {
    this.newDate = new Date(); // initialize newDate with the current date in the constructor
  this.prevMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
  this.nextMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  this.days = this.getDaysInMonth(year, month);


  }


  newTime: string = '';
  newSubject: string = '';
  newEvent: string= '';
  newDescription: string = '';
  newSection: string = '';
  newLocation: string = '';
  newSemester: string = '';
  isSideBarCollapsed = false;
  screenWidth = 0;

  onToggleSideBar(): void {}

  events: EventItem[] = [];

  addEvent(
    date: Date,
    time: string,
    event: string,
    description: string,
    section: string,
    location: string,
    semester: string
  ) {
    const newItem: EventItem = { date, time, description,  section, location, semester, event };
    this.events.push(newItem);
  }

  deleteEvent(index: number) {
    this.events.splice(index, 1);
  }

  ngOnInit() {
    this.showForm = false;
    const myDivNativeElement = this.myDivRef.nativeElement as HTMLElement;


  }


  ngAfterViewInit() {
    const daysContainer = this.daysContainerRef.nativeElement;

    // Check if daysContainer is null or undefined
    if (!daysContainer) {
      console.error('Days container not found');
      return;
    }

    this.renderCalendar();
  }

  renderCalendar() {

    const daysContainer = this.daysContainerRef.nativeElement;

    // Clear previous calendar
    daysContainer.innerHTML = '';

    // Set calendar title
    this.calendarTitle = this.currentDate.toLocaleString('en-us', { month: 'long', year: 'numeric' });

    // Get first day of the month
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);

    // Get last day of the month
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    // Get number of days in the month
    const numDays = lastDay.getDate();

    // Get day of the week of the first day
    const firstDayOfWeek = firstDay.getDay();

    const prevMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);

    // Calculate next month date
    const nextMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);


    // Create empty boxes for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const box = document.createElement('div');
      box.classList.add('day', 'other-month');
      daysContainer.appendChild(box);
    }

    // Create boxes for each day in the month
    for (let i = 1; i <= numDays; i++) {
      const box = document.createElement('div');
      box.classList.add('day');
      if (i === this.currentDate.getDate() && this.currentDate.getMonth() === new Date().getMonth()) {
        box.classList.add('today');
      }
      box.innerText = i.toString();
      this.daysContainerRef.nativeElement.querySelector('.days').appendChild(box);
    }

    // Create empty boxes for days after the last day of the month
    for (let i = lastDay.getDay() + 1; i <= 6; i++) {
      const box = document.createElement('div');
      box.classList.add('day', 'other-month');
      daysContainer.appendChild(box);
    }



    // Update the calendar header with the current month and year
    const calendarTitle = document.getElementById('calendar-title');
    if (calendarTitle) {
      calendarTitle.innerText = this.calendarTitle;
    }

    // Add event listeners to the Prev and Next buttons in the calendar header
    const prevButton = document.querySelector('.calendar-header a:first-child');
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        this.currentDate = prevMonth;
        this.renderCalendar();
      });
    }

    const nextButton = document.querySelector('.calendar-header a:last-child');
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        this.currentDate = nextMonth;
        this.renderCalendar();
      });
    }

  }




}
