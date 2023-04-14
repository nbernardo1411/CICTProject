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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'home', component: HomeComponent },
  { path: 'accountcreate', component: AccountcreateComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'attendance', component: AttendanceComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
