// accountcreate.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

interface ApiResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-accountcreate',
  templateUrl: './accountcreate.component.html',
  styleUrls: ['./accountcreate.component.css']
})
export class AccountcreateComponent {
  name: string = "";
  email: string = "";
  type: string = "";
  password: string = "";
  confirmPassword: string = "";
  idNumber: string="";


  constructor(private http: HttpClient) {}

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

}
