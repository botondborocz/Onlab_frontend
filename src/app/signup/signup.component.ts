import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {provideAnimations} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatFormField, MatInput, MatLabel, MatIcon, MatIconButton, MatSuffix],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [provideAnimations()]
})
export class SignupComponent {
  //username: FormControl = new FormControl('')
  //password: FormControl = new FormControl('')
  //isAdmin: FormControl = new FormControl('')
  hide: boolean = true;

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
  }

  profileForm = this.formBuilder.group({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    isAdmin: ""
  })


  signup() {
    var body = {
      username: this.profileForm.value.username,
      password: this.profileForm.value.password,
      isAdmin: this.profileForm.value.isAdmin
    }
    var url: string
    if (this.profileForm.value.isAdmin) {
      url = '/api/auth/signup/admin'
    } else {
      url = '/api/auth/signup/user'
    }
    this.authService.register(body, url).subscribe({
      next: (response) => console.log(response),
      error: (error) => (this.snackBar).open(
        "Valamilyen hiba történt", 'Bezárás', {duration: 10000, horizontalPosition: 'right', verticalPosition: 'top'}
      ),
      complete: () => {
        (this.snackBar).open(
          "Sikeres regisztráció", "Bezárás", {duration: 5000, horizontalPosition: 'right', verticalPosition: 'top'}
        );
        this.router.navigate(['/login']);
      }
    });
  }
}

