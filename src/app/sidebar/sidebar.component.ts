import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';



interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;

}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
showSidebar() {
throw new Error('Method not implemented.');
}


  @Output() onToggleSideBar: EventEmitter<SideBarToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;


  ngOnInit(): void{
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;


  }
  closeSidebar(): void{
    this.collapsed = false;


  }



}
