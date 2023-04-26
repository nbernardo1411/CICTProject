import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/component/login/login.component';
import { FacultyComponent } from './faculty/faculty.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HomeComponent } from './home/home.component';
import { AccountcreateComponent } from './home/accountcreate/accountcreate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './admin/component/login/auth.service';
import { FormsModule } from '@angular/forms';
import { AttendanceComponent } from './attendance/attendance.component';
import { FacultyhomeComponent } from './facultyhome/facultyhome.component';
import { KeyborrowComponent } from './keyborrow/keyborrow.component';
import { FacultyscheduleComponent } from './facultyschedule/facultyschedule.component';
import { AuthGuard } from './auth.guard';
import { HomeAuthGuard } from './home-auth.guard';
import { CanActivate } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService] },
  { path: 'faculty', component: FacultyComponent , canActivate: [AuthService] },
  { path: 'home', component: HomeComponent },
  { path: 'facultyhome', component: FacultyhomeComponent, canActivate: [AuthGuard] },
  { path: 'keyborrow', component: KeyborrowComponent, canActivate: [AuthGuard] },
  { path: 'facultyschedule', component: FacultyscheduleComponent, canActivate: [AuthGuard] },
  { path: 'accountcreate', component: AccountcreateComponent },
  { path: 'inventory', component: InventoryComponent , canActivate: [AuthService] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthService] },
  { path: 'attendance', component: AttendanceComponent , canActivate: [AuthService] },
];



@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
