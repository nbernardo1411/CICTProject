import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AttendanceFormData {
  date: string;
  name: string;
  room: string;
  status: string;
}

@Component({
  selector: 'app-attendancechecker',
  templateUrl: './attendancechecker.component.html',
  styleUrls: ['./attendancechecker.component.css'],
})
export class AttendancecheckerComponent {
  formData: AttendanceFormData = {
    date: '',
    name: '',
    room: '',
    status: 'present',
  };

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    const url = 'submit-attendance.php';
    this.http.post(url, this.formData).subscribe((response) => {
      console.log(response);
    });
  }
}
