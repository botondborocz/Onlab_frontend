import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LOCALSTORAGE_TOKEN_KEY, LOCALSTORAGE_TYPE_KEY } from '../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';

export interface Profile {
  id:number
  userName:String;
  password:String;
  firstName:String;
  lastName:String;
  dateOfBirth:Date;
}
@Component({
  selector: 'app-userpersonaldata',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './userpersonaldata.component.html',
  styleUrl: './userpersonaldata.component.scss'
})
export class PersonaldataComponent {
  oldUserName:String="";
  oldPassWord:String="";
  oldFirstName:String=""; 
  oldLastName:String="";
  id:number=0;
  oldBirthDate:Date=new Date(2023,1,4);

  profileForm = new UntypedFormGroup({
    username: new UntypedFormControl(null, [Validators.maxLength(50)]),
    password: new UntypedFormControl(null, []),
    firstname: new UntypedFormControl(null, []),
    lastname: new UntypedFormControl(null, []),
    datepicker: new FormControl()
  },)

  url:string='';
  username:string | null=''

  constructor(private http:HttpClient, private snackBar:MatSnackBar){
    this.url="/api/user/personaldata";
    this.username=localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    this.getDatafromBackend();
    this.setvalues();
  }

  getDatafromBackend(){
    var responseData: Profile;
    this.http.get<Profile>(this.url + '/'+ this.username).
    subscribe({
      next: (next) =>  {responseData = next;}, 
      error: (error) => console.log(error), 
      complete: () => {
        console.log(responseData); 
        this.id=responseData.id;
        this.oldUserName=responseData.userName;
        this.oldPassWord=responseData.password;
        this.oldFirstName=responseData.firstName;
        this.oldLastName=responseData.lastName;}
      });
  }

  setvalues(){
    this.profileForm.setValue({
    username: this.oldUserName,
    password: this.oldPassWord,
    firstname: this.oldFirstName,
    lastname: this.oldLastName, 
    datepicker: this.oldBirthDate
    })
  }

  cancel(){
    this.getDatafromBackend();
    this.setvalues();
  }

  dosomething() {
    var profileData: Profile={
      id: this.id,
      userName:"aaa",
      password:"bbb",
      firstName:"ccc",
      lastName:"ddd",
      dateOfBirth:new Date(2000,2,2)
    }
    this.http.post<Profile>(this.url, profileData).subscribe( {
      next: (response) => console.log(response),
        error: (error) =>{ 
          (this.snackBar).open(
          "Data modification failed", 'Close', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
          );
        },
        complete: () => {
          (this.snackBar).open(
            "Data modification successful", "Close", {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'}
          );
        }
    });
  }

  save(){
    if (!this.profileForm.valid) {
      return;
    } 
    var profileData: Profile={
      id: this.id,
      userName:this.profileForm.value.username!=null ? this.profileForm.value.username : this.oldUserName,
      password:this.profileForm.value.password!=null ? this.profileForm.value.password : this.oldPassWord,
      firstName:this.profileForm.value.firstname !=null ? this.profileForm.value.firstname : this.oldFirstName,
      lastName:this.profileForm.value.lastname !=null ? this.profileForm.value.lastname : this.oldLastName,
      dateOfBirth:this.profileForm.value.datepicker !=null ? this.profileForm.value.datepicker : this.oldBirthDate,
    }
  console.log(profileData);
   this.http.post<Profile>(this.url, profileData).subscribe( {
    next: (response) => console.log(response),
      error: (error) =>{ 
        (this.snackBar).open(
        "Data modification failed", 'Close', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
        );
      },
      complete: () => {
        (this.snackBar).open(
          "Data modification successful", "Close", {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'}
        );
      }
  });
  }
}
