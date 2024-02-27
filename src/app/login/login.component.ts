import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Validator} from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Console, error } from 'console';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { LoginResponse } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LOCALSTORAGE_TOKEN_KEY, LOCALSTORAGE_TYPE_KEY } from '../app.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    username:FormControl=new FormControl('')
    password:FormControl=new FormControl('')
    isProf:FormControl=new FormControl('')
    response:any
    constructor(private snackBar:MatSnackBar,
      private http: HttpClient,
      private router: Router,
      private authService: AuthService){}

     login(){
      let url:string
      let routerurl:string
      if(this.isProf.value){
        url='/auth/login/professor'
        routerurl='/professor/personaldata'
      }
      else {
        url='/auth/login/student'
        routerurl='/student/personaldata'
      }

      var body={
          username: this.username.value,
          password: this.password.value
      }
       this.http.post<LoginResponse>(url, body).subscribe({next: (response) => {
        console.log(response)
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, response.username);
        localStorage.setItem(LOCALSTORAGE_TYPE_KEY, response.type);
        },
       error: (error) =>{
        this.snackBar.open(
          'Hibás felhasználónév vagy jelszó', 'Bezárás', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'}
          );
        },
       complete: () => {
        (this.snackBar).open(
          "Sikeres bejelentkezés", "Bezárás", {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'}
        );
        this.router.navigate([routerurl]);
       }
   });
  }
}
