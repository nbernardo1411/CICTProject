import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface User {
  id_number: number;
  name: string;
  email: string;
  type: string;
}
interface ApiResponse {
  success: boolean;
  message: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  isSideBarCollapsed = false;
  screenWidth = 0;
  onToggleSideBar(): void {
    // Add implementation for the method here
  }
  users: User[] = [];
  showForm = false; // Define the showForm property here

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<any>('http://localhost/CICTProject/src/displayusers.php').subscribe(response => {
      if (response.success) {
        this.users = response.data;
      } else {
        console.log(response.message);
      }
    });
  }
  name: string = "";
  email: string = "";
  type: string = "";
  password: string = "";
  confirmPassword: string = "";
  idNumber: string="";

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const name = this.name;
    const email = this.email;
    const idNumber = this.idNumber;
    const type = this.type;
    const password = this.password;
    const confirmPassword = this.confirmPassword;

    if (password !== confirmPassword) {
      alert('The passwords you entered do not match. Please try again.');
      return;
    }

    const data = {
  name,
  email,
  type,
  password,
  idNumber,
};

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<ApiResponse>('http://localhost/CICTProject/src/accountcreate.php', JSON.stringify(data), {headers}).subscribe(
      (response) => {
        if (response.success) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      },
      (error) => {
        console.error(error);
        alert('An error occurred while creating your account. Please try again later.');
      }
    );
  }


  toggleForm() {
    this.showForm = !this.showForm;
  }
}
