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
import {ThemeService} from "../../../theme.service";
import {NgClass} from "@angular/common";
import {Game, GameId, NewScorer, Scorer} from "../../../interfaces";


@Component({
  selector: 'app-dialogcontentaddgoalscorers',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatDialogModule,
    MatButtonModule, MatSelectModule, MatInputModule,
    MatTableModule, MatIconModule, NgClass],
  templateUrl: './dialogcontentaddgoalscorers.component.html',
  styleUrl: './dialogcontentaddgoalscorers.component.scss'
})
export class DialogcontentaddgoalscorersComponent {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService, private snackBar: MatSnackBar, private formBuilder: FormBuilder, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: GameId) {
    this.getGame();
    this.getHomeScorers();
    this.getAwayScorers();
    this.getHomePlayers();
    this.getAwayPlayers();
    this.isDarkMode = themeService.isDarkMode();
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

  /**
   * Retrieves the game details.
   */
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

  /**
   * Retrieves home scorers for the game.
   */
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

  /**
   * Retrieves away scorers for the game.
   */
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

  /**
   * Retrieves home players for the team.
   */
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

  /**
   * Retrieves away players for the team.
   */
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

  /**
   * Saves the new goalscorer.
   */
  save() {
    let scorerData: NewScorer = {
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

