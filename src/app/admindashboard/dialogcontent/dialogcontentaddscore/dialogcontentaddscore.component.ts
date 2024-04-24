import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, UntypedFormControl, UntypedFormGroup, ReactiveFormsModule, FormControl} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

export interface Game{
  id:number
  homeScore:number
  awayScore:number
}

@Component({
  selector: 'app-dialogcontentaddscore',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, 
    MatFormFieldModule, MatInputModule, 
    MatSelectModule, MatButtonModule,
    MatTooltipModule, MatIconModule,
    MatDatepickerModule, MatNativeDateModule,
    MatDialogModule],
  templateUrl: './dialogcontentaddscore.component.html',
  styleUrl: './dialogcontentaddscore.component.scss'
})
export class DialogcontentaddscoreComponent {
  //id:number=0;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private snackBar:MatSnackBar) {
    this.getGames();
  }
  games: Game[] = [];

  gameForm = this.formBuilder.group({
    id: new FormControl,
    homeScore: new FormControl,
    awayScore: new FormControl
  })

  getGames(){
    this.http.get<Game[]>('/api/general/allgames').subscribe(
      data => {
        console.log(data);
        this.games = data;
      }
    )
  }

  save() {
    if (!this.gameForm.valid) {
      return;
    } 
    var gameData: Game={
      id:this.gameForm.value.id,
      homeScore:this.gameForm.value.homeScore,
      awayScore:this.gameForm.value.awayScore
    }
    console.log(this.gameForm.value.homeScore);
    this.http.post<Game>('/api/admin/newscore', gameData).subscribe( {
      next: (response) => console.log(response),
        error: (error) =>{ 
          (this.snackBar).open(
          "New score failed", 'Close', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
          );
        },
        complete: () => {
          (this.snackBar).open(
            "New score added", "Close", {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'}
          );
        }
    });
  }
}
