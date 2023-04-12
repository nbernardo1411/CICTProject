import { Component } from '@angular/core';

interface SideBarToggle {
  screenWidt: number;
  collapsed: boolean;

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CICT Class Monitoring and Inventory System';

  isSideBarCollapsed = false;
  screenWidth = 0;

  onToggleSideBar(): void{


  }
}
