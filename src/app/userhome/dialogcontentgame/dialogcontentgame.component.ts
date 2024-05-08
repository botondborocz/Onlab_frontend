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

export interface Game {
  id: number
  homeTeamName: string
  awayTeamName: string
  homeScore: number
  awayScore: number
  championship: string
}

export interface GameId {
  gameId: number
}

export interface Scorer {
  firstName: string
  lastName: string
}

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
    this.getGame();
    this.getHomeScorers();
    this.getAwayScorers();
    this.username = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    this.isDarkMode = this.themeService.isDarkMode();
  }

  //selectedGameId:GameId = this.data;
  username: string | null = "";
  games: Game[] = [];
  homeScorers: Scorer[] = [];
  awayScorers: Scorer[] = [];
  columnsToDisplayGame = ["homeFavourite", "homeTeamName", "homeScore", "awayScore", "awayTeamName", "awayFavourite"];
  columnsToDisplayHomeScorers = ["name"];
  columnsToDisplayAwayScorers = ["name"];

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

  public changeHomeFavorite(game: Game) {
    this.http.post<Game>('/api/user/changehomefavorite/' + this.username, game).subscribe({
        next: (response) => console.log(response),
        error: (error) => {
          //error
        },
        complete: () => {
          this.getGame();
          console.log(game);
        }
      }
    );
  }

  public changeAwayFavorite(game: Game) {
    this.http.post<Game>('/api/user/changeawayfavorite/' + this.username, game).subscribe({
        next: (response) => console.log(response),
        error: (error) => {
          //error
        },
        complete: () => {
          this.getGame();
          console.log(game);
        }
      }
    );
  }
}
