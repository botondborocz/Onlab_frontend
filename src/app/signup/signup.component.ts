import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatFormField, MatInput, MatLabel, MatIcon, MatIconButton, MatSuffix, MatFormFieldModule, JsonPipe, MatButton],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: []
})
export class SignupComponent {
  hide: boolean = true;

  profileForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.profileForm = formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      isAdmin: [""]
    });
  }

  signup() {
    if (!this.profileForm.valid) {
      (this.snackBar).open(
        "Every field is required", 'Close', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
      );
      return;
    }
    let body = {
      username: this.profileForm.value.username,
      password: this.profileForm.value.password,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      isAdmin: this.profileForm.value.isAdmin
    }
    let url: string
    if (this.profileForm.value.isAdmin) {
      url = '/api/auth/signup/admin'
    } else {
      url = '/api/auth/signup/user'
    }
    this.authService.register(body, url).subscribe({
      next: (response) => console.log(response),
      error: (error) => (this.snackBar).open(
        "Some error has occured", 'Close', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
      ),
      complete: () => {
        (this.snackBar).open(
          "Successful registration", "Close", {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'}
        );
        this.router.navigate(['/login']);
      }
    });
  }
}
