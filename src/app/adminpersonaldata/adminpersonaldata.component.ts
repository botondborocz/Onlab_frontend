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

export interface Profile {
  id: number
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  //dateOfBirth:Date;
}

@Component({
  selector: 'app-adminpersonaldata',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,
    FormsModule, ReactiveFormsModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule,
    MatIconModule],
  templateUrl: './adminpersonaldata.component.html',
  styleUrl: './adminpersonaldata.component.scss'
})
export class AdminpersonaldataComponent {
  hide = true;
  oldUsername: string = "";
  oldPassword: string = "";
  oldFirstName: string = "";
  oldLastName: string = "";
  id: number = 0;
  //oldBirthDate:Date=new Date(2023,1,4);

  url: string = '';
  username: string | null = ''

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private formBuilder: FormBuilder, private router: Router) {
    this.url = "/api/admin/personaldata";
    this.username = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    this.getDatafromBackend();
    this.setvalues();
  }

  profileForm = this.formBuilder.group({
    username: this.oldUsername,
    password: this.oldPassword,
    firstName: this.oldFirstName,
    lastName: this.oldLastName,
    datepicker: Date
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
      }
    });
  }

  setvalues() {
    this.profileForm.setValue({
      username: this.oldUsername,
      password: this.oldPassword,
      firstName: this.oldFirstName,
      lastName: this.oldLastName,
      datepicker: null
    })
  }

  gohome() {
    this.router.navigate(['/admin/home']);
  }

  show() {
    this.getDatafromBackend();
    this.setvalues();
  }


  save() {
    if (!this.profileForm.valid) {
      return;
    }
    var profileData: Profile = {
      id: this.id,
      username: this.profileForm.value.username != null ? this.profileForm.value.username : this.oldUsername,
      password: this.profileForm.value.password != null ? this.profileForm.value.password : this.oldPassword,
      firstName: this.profileForm.value.firstName != null ? this.profileForm.value.firstName : this.oldFirstName,
      lastName: this.profileForm.value.lastName != null ? this.profileForm.value.lastName : this.oldLastName,
      //dateOfBirth:this.profileForm.value.datepicker !=null ? this.profileForm.value.datepicker : this.oldBirthDate,
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
