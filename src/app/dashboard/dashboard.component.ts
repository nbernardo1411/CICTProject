import { Component } from '@angular/core';
import { AttendanceChartComponent } from '../attendance-chart/attendance-chart.component';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;

}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentDate = new Date();
  isSideBarCollapsed = false;
  screenWidth = 0;

  onToggleSideBar(): void {
    // Add implementation for the method here
  }
}
