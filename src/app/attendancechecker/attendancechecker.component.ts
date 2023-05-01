import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

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
export class AttendancecheckerComponent implements OnInit {
  formData: AttendanceFormData = {
    date: new Date().toISOString().slice(0, 10),
    name: '',
    room: '',
    status: 'present',
  };
  userNames: string[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const url = 'https://cmkis.online/backend/get-user-names.php';
    this.http.get<string[]>(url).subscribe((userNames) => {
      this.userNames = userNames;
    });
  }

  onSubmit() {
    const name = this.formData.name;
    const date = this.formData.date;
    const room = this.formData.room;
    const status = this.formData.status;

    const formData = { name, date, room, status };

    this.http.post('https://cmkis.online/backend/submit-attendance.php', formData)
      .subscribe(
        (response) => {
          console.log('Attendance submitted successfully');
          alert('Attendance submitted successfully');
        },
        (error) => {
          console.error('Error submitting attendance:', error);
        }
      );
  }



}
