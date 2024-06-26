import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA,} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {NgClass} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {LOCALSTORAGE_TOKEN_KEY} from "../../app.component";
import {ThemeService} from "../../theme.service";
import {Game, GameId, Scorer} from "../../interfaces";

@Component({
  selector: 'app-dialogcontentgame',
  standalone: true,
  imports: [MatInputModule, MatTableModule, MatFormFieldModule, MatIconModule, NgClass, MatIconButton],
  templateUrl: './dialogcontentgame.component.html',
  styleUrl: './dialogcontentgame.component.scss'
})
export class DialogcontentgameComponent {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: GameId) {
    localStorage.removeItem("game" + this.data.gameId);
    this.getGame();
    this.getHomeScorers();
    this.getAwayScorers();
    this.username = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    this.isDarkMode = this.themeService.isDarkMode();
  }

  username: string | null = "";
  games: Game[] = [];
  homeScorers: Scorer[] = [];
  awayScorers: Scorer[] = [];
  columnsToDisplayGameHome = ["homeTeamName", "homeScore"];
  columnsToDisplayGameAway = ["awayScore", "awayTeamName"];
  columnsToDisplayHomeScorers = ["name"];
  columnsToDisplayAwayScorers = ["name"];

  /**
   * Retrieves game details from the backend.
   */
  getGame() {
    const gameId = {
      params: {'gameId': this.data.gameId}
    }
    if (localStorage.getItem("game" + this.data.gameId) === null) {
      this.http.get<Game[]>("/api/general/game", gameId).subscribe(
        res => {
          console.log(res);
          this.games = res;
          localStorage.setItem("game" + this.data.gameId, JSON.stringify(res));
        }
      )
    } else {
      this.games = JSON.parse(localStorage.getItem("game" + this.data.gameId) ?? '[]');
    }
  }
  
  /**
   * Retrieves home scorers from the backend.
   */
  getHomeScorers() {
    const gameId = {
      params: {'gameId': this.data.gameId}
    }
    if (localStorage.getItem("homescorers" + this.data.gameId) === null) {
      this.http.get<Scorer[]>("/api/general/game/homescorers", gameId).subscribe(
        res => {
          console.log(res);
          this.homeScorers = res;
          localStorage.setItem("homescorers" + this.data.gameId, JSON.stringify(res));
        }
      )
    } else {
      this.homeScorers = JSON.parse(localStorage.getItem("homescorers" + this.data.gameId) ?? '[]');
    }
  }

  /**
   * Retrieves away scorers from the backend.
   */
  getAwayScorers() {
    const gameId = {
      params: {'gameId': this.data.gameId}
    }
    if (localStorage.getItem("awayscorers" + this.data.gameId) === null) {
      this.http.get<Scorer[]>("/api/general/game/awayscorers", gameId).subscribe(
        res => {
          console.log(res);
          this.awayScorers = res;
          localStorage.setItem("awayscorers" + this.data.gameId, JSON.stringify(res));
        }
      )
    } else {
      this.awayScorers = JSON.parse(localStorage.getItem("awayscorers" + this.data.gameId) ?? '[]');
    }
  }

}
