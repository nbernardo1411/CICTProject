import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FacultyComponent } from './faculty/faculty.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { HomeComponent } from './home/home.component';
import { AccountcreateComponent } from './home/accountcreate/accountcreate.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms'; // Add this import
import { MatFormFieldModule } from '@angular/material/form-field';
import { AttendanceChartComponent } from './attendance-chart/attendance-chart.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './admin/component/login/auth.service';
import { LoginComponent } from './admin/component/login/login.component';
import { AttendanceComponent } from './attendance/attendance.component';
import html2canvas from 'html2canvas';
import { FacultyhomeComponent } from './facultyhome/facultyhome.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { KeyborrowComponent } from './keyborrow/keyborrow.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'faculty',
    component: FacultyComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'attendance',
    component: AttendanceComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    InventoryComponent,
    FacultyComponent,
    ScheduleComponent,
    HomeComponent,
    LoginComponent,
    AccountcreateComponent,
    SidebarComponent,
    DashboardComponent,
    CalendarComponent,
    AttendanceChartComponent,
    AttendanceComponent,
    FacultyhomeComponent,
    KeyborrowComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    FormsModule, // Add this line
    CommonModule,
    JwtModule.forRoot({}),
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService] },
    ])


  ],
  providers: [AuthService, JwtHelperService,{
    provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS
  }],
   // add AuthService to the providers array
  bootstrap: [AppComponent]
})
export class AppModule { }
