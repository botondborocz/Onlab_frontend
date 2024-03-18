import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, UntypedFormControl, UntypedFormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

export interface Game{
  id:number
  homeTeamName:string
  awayTeamName:string
  homeScore:number
  awayScore:number
  championshipName:string
}

export interface Championship{
  id:number
  name:string
}

export interface Team{
  id:number
  teamName:string
}

export interface Championship{
  id:number
  name:string
}

@Component({
  selector: 'app-dialogcontentaddgame',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, 
    MatFormFieldModule, MatInputModule, 
    MatSelectModule, MatButtonModule,
    MatTooltipModule, MatIconModule,
    MatDatepickerModule, MatNativeDateModule,
    MatDialogModule],
  templateUrl: './dialogcontentaddgame.component.html',
  styleUrl: './dialogcontentaddgame.component.scss'
})
export class DialogcontentaddgameComponent {
  id:number=0;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private snackBar:MatSnackBar) {
    this.getTeams();
    this.getChampionships();
  }
  options: Game[] = [];
  teams: Team[] = [];
  championships: Championship[] = [];

  gameForm = this.formBuilder.group({
    homeTeamName: new UntypedFormControl(null, []),
    awayTeamName: new UntypedFormControl(null, []),
    homeScore: new UntypedFormControl(null, []),
    awayScore: new UntypedFormControl(null, []),
    championshipName: new UntypedFormControl(null, [])
  })

  getTeams(){
    this.http.get<Team[]>('/api/general/allteams').subscribe(
      data => {
        console.log(data);
        this.teams = data;
      }
    )
  }

  getChampionships(){
    this.http.get<Championship[]>('/api/general/allchampionships').subscribe(
      data => {
        console.log(data);
        this.championships = data;
      }
    )
  }

  save() {
    if (!this.gameForm.valid) {
      return;
    } 
    var gameData: Game={
      id:this.id,
      homeTeamName:this.gameForm.value.homeTeamName,
      homeScore:this.gameForm.value.homeScore,
      awayScore:this.gameForm.value.awayScore,
      awayTeamName:this.gameForm.value.awayTeamName,
      championshipName:this.gameForm.value.championshipName,
      }
    this.http.post<Game>('/api/admin/newgame', gameData).subscribe( {
      next: (response) => console.log(response),
        error: (error) =>{ 
          (this.snackBar).open(
          "New game failed", 'Close', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
          );
        },
        complete: () => {
          (this.snackBar).open(
            "New game added", "Close", {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'}
          );
        }
    });
  }

}