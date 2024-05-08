import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LoginResponse} from '../interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LOCALSTORAGE_TOKEN_KEY, LOCALSTORAGE_TYPE_KEY} from '../app.component';
import {AuthService} from '../auth.service';
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatIcon, MatIconButton, MatSuffix, MatCardTitle, MatCard, MatCardHeader, MatCardContent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: []
})
export class LoginComponent {
  //username: FormControl = new FormControl('')
  //password: FormControl = new FormControl('')
  //isAdmin: FormControl = new FormControl('')
  hide: boolean = true;
  response: any

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  profileForm = this.formBuilder.group({
    username: "",
    password: "",
    isAdmin: ""
  })

  login() {
    let url: string
    let routerurl: string
    if (this.profileForm.value.isAdmin) {
      url = '/api/auth/login/admin'
      routerurl = '/admin/home'
    } else {
      url = '/api/auth/login/user'
      routerurl = '/user/home'
    }

    var body = {
      username: this.profileForm.value.username,
      password: this.profileForm.value.password
    }
    this.http.post<LoginResponse>(url, body).subscribe({
      next: (response) => {
        console.log(response)
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, response.username);
        localStorage.setItem(LOCALSTORAGE_TYPE_KEY, response.type);
        console.log(response.type)
      },
      error: (error) => {
        this.snackBar.open(
          'Incorrect username or password', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );
      },
      complete: () => {
        (this.snackBar).open(
          "Successful login", "Close", {duration: 3000, horizontalPosition: 'center', verticalPosition: 'top'}
        );
        this.router.navigate([routerurl]);
      }
    });
  }
}


