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
import {MatTabGroup} from "@angular/material/tabs";
import {NgClass, NgStyle} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ThemeService} from "../theme.service";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AuthService} from "../auth.service";

export interface Profile {
  id: number
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

@Component({
  selector: 'app-userpersonaldata',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, FormsModule,
    ReactiveFormsModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatIconModule, MatTabGroup, NgClass,
    MatSlideToggle, MatIconButton, MatToolbar, MatToolbarRow,
    MatMenu, MatMenuItem, MatMenuTrigger, NgStyle, MatButtonModule],
  templateUrl: './userpersonaldata.component.html',
  styleUrl: './userpersonaldata.component.scss',
  providers: []
})

export class PersonaldataComponent {
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

  constructor(private themeService: ThemeService, private authService: AuthService,
              private http: HttpClient, private snackBar: MatSnackBar,
              private formBuilder: FormBuilder, private router: Router) {
    this.url = "/api/user/personaldata";
    this.username = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    this.isDarkMode = themeService.isDarkMode();
    this.getDatafromBackend();
    this.setvalues();
  }

  profileForm = this.formBuilder.group({
    username: this.oldUsername,
    password: this.oldPassword,
    firstName: this.oldFirstName,
    lastName: this.oldLastName,
    datepicker: this.oldBirthDate
  })

  getDatafromBackend() {
    var responseData: Profile;
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
      }
    });
  }

  setvalues() {
    this.profileForm.setValue({
      username: this.oldUsername,
      password: this.oldPassword,
      firstName: this.oldFirstName,
      lastName: this.oldLastName,
      datepicker: this.oldBirthDate
    })
  }


  show() {
    this.getDatafromBackend();
    this.setvalues();
  }


  save() {
    if (!this.profileForm.valid) {
      return;
    }
    let profileData: Profile = {
      id: this.id,
      username: this.profileForm.value.username != null ? this.profileForm.value.username : this.oldUsername,
      password: this.profileForm.value.password != null ? this.profileForm.value.password : this.oldPassword,
      firstName: this.profileForm.value.firstName != null ? this.profileForm.value.firstName : this.oldFirstName,
      lastName: this.profileForm.value.lastName != null ? this.profileForm.value.lastName : this.oldLastName,
      birthDate: this.profileForm.value.datepicker != null ? this.profileForm.value.datepicker : this.oldBirthDate,
    }
    console.log(profileData);
    this.http.post<Profile>(this.url + '/' + this.username, profileData).subscribe({
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


  logout() {
    this.authService.logout();
    this.themeService.setDarkMode(false);
    this.router.navigate(['/login']);
  }

  gotofavs() {
    this.router.navigate(['/user/favourites']);
  }

  gotomyaccount() {
    this.router.navigate(['/user/personaldata']);
  }

  gohome() {
    this.router.navigate(['/user/home']);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
