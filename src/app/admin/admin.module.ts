import { NgModule } from '@angular/core';
import { AuthService } from './component/login/auth.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports:[FormsModule],
  providers: [
    AuthService
  ]
})
export class AdminModule { }
