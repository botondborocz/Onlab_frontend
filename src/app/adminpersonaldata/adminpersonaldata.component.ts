import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LOCALSTORAGE_TOKEN_KEY} from '../app.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {ThemeService} from "../theme.service";
import {NgClass, NgStyle} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {AuthService} from "../auth.service";
import {Profile} from "../interfaces";


@Component({
  selector: 'app-adminpersonaldata',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,
    FormsModule, ReactiveFormsModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule,
    MatIconModule, NgClass, NgStyle, MatIconButton, MatMenu, MatMenuItem, MatSlideToggle, MatToolbar, MatToolbarRow, MatMenuTrigger, MatButton],
  templateUrl: './adminpersonaldata.component.html',
  styleUrl: './adminpersonaldata.component.scss'
})
export class AdminpersonaldataComponent {
  isDarkMode: boolean;
  hide = true;
  oldUsername: string = "";
  oldPassword: string = "";
  oldFirstName: string = "";
  oldLastName: string = "";
  id: number = 0;
  oldBirthDate: Date = new Date();

  url: string = '';
  username: string | null = ''

  constructor(private themeService: ThemeService, private authService: AuthService, private http: HttpClient, private snackBar: MatSnackBar, private formBuilder: FormBuilder, private router: Router) {
    this.url = "/api/admin/personaldata";
    this.username = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    this.isDarkMode = themeService.isDarkMode();
    this.getDatafromBackend();
  }

  profileForm = this.formBuilder.group({
    username: this.oldUsername,
    password: this.oldPassword,
    firstName: this.oldFirstName,
    lastName: this.oldLastName,
    datepicker: this.oldBirthDate
  })

  /**
   * Retrieves the admin's personal data from the backend.
   */
  getDatafromBackend() {
    let responseData: Profile;
    this.http.get<Profile>(this.url + '/' + this.username).subscribe({
      next: (next) => {
        responseData = next;
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log(responseData);
        this.id = responseData.id;
        this.oldUsername = responseData.username;
        this.oldPassword = responseData.password;
        this.oldFirstName = responseData.firstName;
        this.oldLastName = responseData.lastName;
        this.oldBirthDate = responseData.birthDate;
        this.setvalues();
      }
    });
  }

  /**
   * Sets the form values to the retrieved admin's personal data.
   */
  setvalues() {
    this.profileForm.setValue({
      username: this.oldUsername,
      password: this.oldPassword,
      firstName: this.oldFirstName,
      lastName: this.oldLastName,
      datepicker: this.oldBirthDate
    })
  }

  /**
   * Navigates to the admin dashboard home.
   */
  gohome() {
    this.router.navigate(['/admin/home']);
  }

  /**
   * Toggles the theme between light and dark mode.
   */
  public toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  /**
   * Logs out the admin and navigates to the login page.
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.themeService.setDarkMode(false);
  }

  /**
   * Saves the modified admin's personal data.
   */
  save() {
    if (!this.profileForm.valid) {
      return;
    }
    let profileData: Profile = {
      id: this.id,
      username: this.profileForm.value.username ?? this.oldUsername,
      password: this.profileForm.value.password ?? this.oldPassword,
      firstName: this.profileForm.value.firstName ?? this.oldFirstName,
      lastName: this.profileForm.value.lastName ?? this.oldLastName,
      birthDate: this.profileForm.value.datepicker ?? this.oldBirthDate,
    }
    console.log(profileData);
    this.http.post<Profile>(this.url + '/' + this.username, profileData).subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        (this.snackBar).open(
          "Data modification failed", 'Close', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
        );
      },
      complete: () => {
        (this.snackBar).open(
          "Data modification successful", "Close", {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );
      }
    });
  }
}
