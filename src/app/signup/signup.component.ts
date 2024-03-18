import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username:FormControl=new FormControl('')
  password:FormControl=new FormControl('')
  isAdmin:FormControl=new FormControl('')

  constructor(private authService:AuthService, 
    private router: Router,
    private snackBar:MatSnackBar){}


  signup(){
    var body={
      username: this.username.value,
      password: this.password.value,
      isAdmin:this.isAdmin.value
    }
    var url:string
    if(this.isAdmin.value){
      url='/api/auth/signup/admin'
    }
    else{
      url='/api/auth/signup/user'
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
