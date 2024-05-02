import {Component, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Game {
  id: number
  homeScore: number
  awayScore: number
}

export interface GameId {
  gameId: number
  homeTeamName: string
  awayTeamName: string
}

export interface Scorer {
  id: number
  firstName: string
  lastName: string
}

export interface NewScorer {
  gameId: number
  homeScorerId: number
  awayScorerId: number
  homeScore: number
  awayScore: number
}

@Component({
  selector: 'app-dialogcontentaddgoalscorers',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatDialogModule,
    MatButtonModule, MatSelectModule, MatInputModule,
    MatTableModule, MatIconModule],
  templateUrl: './dialogcontentaddgoalscorers.component.html',
  styleUrl: './dialogcontentaddgoalscorers.component.scss'
})
export class DialogcontentaddgoalscorersComponent {
  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: GameId) {
    this.getGame();
    this.getHomeScorers();
    this.getAwayScorers();
    this.getHomePlayers();
    this.getAwayPlayers();
  }

  games: Game[] = [];
  homeScorers: Scorer[] = [];
  awayScorers: Scorer[] = [];
  homePlayers: Scorer[] = [];
  awayPlayers: Scorer[] = [];
  columnsToDisplayGame = ["homeTeamName", "homeScore", "awayScore", "awayTeamName"];
  columnsToDisplayHomeScorers = ["name"];
  columnsToDisplayAwayScorers = ["name"];


  homeScorerForm = this.formBuilder.group({
    homeScorerId: new FormControl,
    homeScore: new FormControl
  })

  awayScorerForm = this.formBuilder.group({
    awayScorerId: new FormControl,
    awayScore: new FormControl
  })

  getGame() {
    const gameId = {
      params: {'gameId': this.data.gameId}
    }
    this.http.get<Game[]>("/api/general/game", gameId).subscribe(
      res => {
        console.log(res);
        this.games = res;
      }
    )
  }

  getHomeScorers() {
    const gameId = {
      params: {'gameId': this.data.gameId}
    }
    this.http.get<Scorer[]>("/api/general/game/homescorers", gameId).subscribe(
      res => {
        console.log(res);
        this.homeScorers = res;
      }
    )
  }

  getAwayScorers() {
    const gameId = {
      params: {'gameId': this.data.gameId}
    }
    this.http.get<Scorer[]>("/api/general/game/awayscorers", gameId).subscribe(
      res => {
        console.log(res);
        this.awayScorers = res;
      }
    )
  }

  getHomePlayers() {
    const teamName = {
      params: {'teamName': this.data.homeTeamName}
    }
    this.http.get<Scorer[]>("api/general/players", teamName).subscribe(
      res => {
        console.log(res);
        this.homePlayers = res;
      }
    )
  }

  getAwayPlayers() {
    const teamName = {
      params: {'teamName': this.data.awayTeamName}
    }
    this.http.get<Scorer[]>("api/general/players", teamName).subscribe(
      res => {
        console.log(res);
        this.awayPlayers = res;
      }
    )
  }

  save() {
    //console.log(this.homeScorers[0].id);
    var scorerData: NewScorer = {
      gameId: this.data.gameId,
      homeScorerId: this.homeScorerForm.value.homeScorerId,
      awayScorerId: this.awayScorerForm.value.awayScorerId,
      homeScore: this.homeScorerForm.value.homeScore,
      awayScore: this.awayScorerForm.value.awayScore
    }
    console.log(scorerData.homeScorerId);
    this.http.post<NewScorer>("api/admin/addscorer", scorerData).subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        (this.snackBar).open(
          "New goalscorer failed", 'Close', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
        );
      },
      complete: () => {
        (this.snackBar).open(
          "New goalscorer added", "Close", {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'}
        );
      }
    });
  }

}

