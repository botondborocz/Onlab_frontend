import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {provideAnimations} from "@angular/platform-browser/animations";
import {ErrorStateMatcher} from "@angular/material/core";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatFormField, MatInput, MatLabel, MatIcon, MatIconButton, MatSuffix, MatFormFieldModule, JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [provideAnimations()]
})
export class SignupComponent {
  //username: FormControl = new FormControl('')
  //password: FormControl = new FormControl('')
  //isAdmin: FormControl = new FormControl('')
  hide: boolean = true;
  matcher = new MyErrorStateMatcher();
  usernameControl = this.formBuilder.control('', [Validators.required]);
  passwordControl = this.formBuilder.control('', [Validators.required]);
  confirmPasswordControl = this.formBuilder.control('', [Validators.required]);
  firstNameControl = this.formBuilder.control('', [Validators.required]);
  lastNameControl = this.formBuilder.control('', [Validators.required]);
  isAdminControl = this.formBuilder.control('', [Validators.required]);

  profileForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.profileForm = formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required, matchValidator]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      isAdmin: [""]
    });
    this.profileForm.addValidators(
      matchValidator(this.profileForm.get('password')!, this.profileForm.get('confirmPassword')!)
    );
  }

  signup() {
    if (!this.profileForm.valid) {
      (this.snackBar).open(
        "Every field is required", 'Close', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
      );
      return;
    }
    var body = {
      username: this.profileForm.value.username,
      password: this.profileForm.value.password,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
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

export function matchValidator(
  control: AbstractControl,
  controlTwo: AbstractControl
): ValidatorFn {
  return () => {
    if (control.value !== controlTwo.value)
      return {match_error: 'Value does not match'};
    return null;
  };
}

export const passwordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value
    ? {passwordsMatch: true}
    : null;
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  /*isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);
    return invalidCtrl || invalidParent;
  }*/
  isErrorState(control: FormControl, form: FormGroupDirective | NgForm | null): boolean {
    return !!((control && control.touched && control.parent && control.parent.invalid));
  }
}
