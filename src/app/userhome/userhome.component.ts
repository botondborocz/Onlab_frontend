import {ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {AuthService} from '../auth.service';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatDialog,} from '@angular/material/dialog';
import {DialogcontentgameComponent} from './dialogcontentgame/dialogcontentgame.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ThemeService} from "../theme.service";
import {LOCALSTORAGE_TOKEN_KEY} from "../app.component";
import {Championship, Game} from "../interfaces";

@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterModule, MatIconModule,
    MatButtonModule, CommonModule, MatTabsModule, MatSlideToggleModule,
    MatMenuModule, MatTableModule, MatButtonToggleModule],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class UserhomeComponent {
  isDarkMode: boolean;
  championships: Championship[] = [];
  selectedChampionshipId: number = -1;
  gamesToday: Game[] = [];
  gamesYesterday: Game[] = [];
  games2DaysAgo: Game[] = [];
  games3DaysAgo: Game[] = [];
  gamesTomorrow: Game[] = [];
  games2DaysLater: Game[] = [];
  games3DaysLater: Game[] = [];
  columnsToDisplayLeft = ["name"];
  columnsToDisplayRight = ["id", "homeFavourite", "homeTeamName", "homeScore", "awayScore", "awayTeamName", "awayFavourite", "button"];

  username: string | null = "";

  constructor(private ref: ChangeDetectorRef, private themeService: ThemeService, private authService: AuthService, private router: Router, private http: HttpClient, private dialog: MatDialog) {
    this.isDarkMode = this.themeService.isDarkMode();
    this.username = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    this.http.get<Championship[]>('/api/general/allchampionships').subscribe(
      data => {
        console.log(data);
        this.championships = data;
        if (this.championships.length > 0) {
          this.championships[0].selected = true;
          this.selectedChampionshipId = this.championships[0].id;
          this.updateSelection(this.championships[0], 'today');
        }
      }
    )
  }

  /**
   * Toggles the theme between light and dark mode.
   */
  public toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  /**
   * Changes the favorite status of the home team.
   * @param game - The game object.
   * @param date - The date for the specific tab as a string.
   */
  public changeHomeFavorite(game: Game, date: string) {
    this.http.post('/api/user/changehomefavorite/' + this.username, game).subscribe({
        error: (error) => {
          console.log("There was an error");
        },
        complete: () => {
          localStorage.removeItem("gamesToday" + this.selectedChampionshipId);
          this.updateChampionshipToday(this.selectedChampionshipId);
          localStorage.removeItem("gamesYesterday" + this.selectedChampionshipId);
          this.updateChampionshipYesterday(this.selectedChampionshipId);
          localStorage.removeItem("games2daysago" + this.selectedChampionshipId);
          this.updateChampionship2daysago(this.selectedChampionshipId);
          localStorage.removeItem("games3daysago" + this.selectedChampionshipId);
          this.updateChampionship3daysago(this.selectedChampionshipId);
          localStorage.removeItem("gamesTomorrow" + this.selectedChampionshipId);
          this.updateChampionshipTomorrow(this.selectedChampionshipId);
          localStorage.removeItem("games2dayslater" + this.selectedChampionshipId);
          this.updateChampionship2dayslater(this.selectedChampionshipId);
          localStorage.removeItem("games3dayslater" + this.selectedChampionshipId);
          this.updateChampionship3dayslater(this.selectedChampionshipId);
        }
      }
    );
  }

  /**
   * Changes the favorite status of the away team.
   * @param game - The game object.
   * @param date - The date for the specific tab as a string.
   */
  public changeAwayFavorite(game: Game, date: string) {
    this.http.post('/api/user/changeawayfavorite/' + this.username, game).subscribe({
        error: (error) => {
          console.log("There was an error");
        },
        complete: () => {
          localStorage.removeItem("gamesToday" + this.selectedChampionshipId);
          this.updateChampionshipToday(this.selectedChampionshipId);
          localStorage.removeItem("gamesYesterday" + this.selectedChampionshipId);
          this.updateChampionshipYesterday(this.selectedChampionshipId);
          localStorage.removeItem("games2daysago" + this.selectedChampionshipId);
          this.updateChampionship2daysago(this.selectedChampionshipId);
          localStorage.removeItem("games3daysago" + this.selectedChampionshipId);
          this.updateChampionship3daysago(this.selectedChampionshipId);
          localStorage.removeItem("gamesTomorrow" + this.selectedChampionshipId);
          this.updateChampionshipTomorrow(this.selectedChampionshipId);
          localStorage.removeItem("games2dayslater" + this.selectedChampionshipId);
          this.updateChampionship2dayslater(this.selectedChampionshipId);
          localStorage.removeItem("games3dayslater" + this.selectedChampionshipId);
          this.updateChampionship3dayslater(this.selectedChampionshipId);
        }
      }
    );
  }

  /**
   * Updates the selected championship and its games for a specific date.
   * @param championship - The championship object.
   * @param date - The date for the specific tab as a string.
   */
  updateSelection(championship: Championship, date: string) {
    this.championships.forEach(function (championship) {
      championship.selected = false;
    })
    championship.selected = true;
    this.updateChampionshipToday(championship.id);
    this.updateChampionshipYesterday(championship.id);
    this.updateChampionship2daysago(championship.id);
    this.updateChampionship3daysago(championship.id);
    this.updateChampionshipTomorrow(championship.id);
    this.updateChampionship2dayslater(championship.id);
    this.updateChampionship3dayslater(championship.id);
  }

  /**
   * Updates the games of the selected championship for today.
   * @param champId - The championship ID.
   */
  public updateChampionshipToday(champId: number) {
    this.selectedChampionshipId = champId;
    const championshipId = {
      params: {'championshipId': champId}
    }
    if (localStorage.getItem("gamesToday" + champId) === null) {
      this.http.get<Game[]>('/api/general/gamestoday/' + this.username, championshipId).subscribe(
        data => {
          console.log(data);
          this.gamesToday = data;
          localStorage.setItem("gamesToday" + champId, JSON.stringify(data));
        }
      )
    } else {
      this.gamesToday = JSON.parse(localStorage.getItem("gamesToday" + champId) ?? '[]');
    }
  }

  /**
   * Updates the games of the selected championship for yesterday.
   * @param champId - The championship ID.
   */
  updateChampionshipYesterday(champId: number) {
    this.selectedChampionshipId = champId;
    const championshipId = {
      params: {'championshipId': champId}
    }
    if (localStorage.getItem("gamesYesterday" + champId) === null) {
      this.http.get<Game[]>('/api/general/gamesyesterday/' + this.username, championshipId).subscribe(
        data => {
          console.log(data);
          this.gamesYesterday = data;
          localStorage.setItem("gamesYesterday" + champId, JSON.stringify(data));
        }
      )
    } else {
      this.gamesYesterday = JSON.parse(localStorage.getItem("gamesYesterday" + champId) ?? '[]');
    }
  }

  /**
   * Updates the games of the selected championship for 2 days ago.
   * @param champId - The championship ID.
   */
  updateChampionship2daysago(champId: number) {
    this.selectedChampionshipId = champId;
    const championshipId = {
      params: {'championshipId': champId}
    }
    if (localStorage.getItem("games2daysago" + champId) === null) {
      this.http.get<Game[]>('/api/general/games2daysago/' + this.username, championshipId).subscribe(
        data => {
          console.log(data);
          this.games2DaysAgo = data;
          localStorage.setItem("games2daysago" + champId, JSON.stringify(data));
        }
      )
    } else {
      this.games2DaysAgo = JSON.parse(localStorage.getItem("games2daysago" + champId) ?? '[]');
    }
  }

  /**
   * Updates the games of the selected championship for 3 days ago.
   * @param champId - The championship ID.
   */
  updateChampionship3daysago(champId: number) {
    this.selectedChampionshipId = champId;
    const championshipId = {
      params: {'championshipId': champId}
    }
    if (localStorage.getItem("games3daysago" + champId) === null) {
      this.http.get<Game[]>('/api/general/games3daysago/' + this.username, championshipId).subscribe(
        data => {
          console.log(data);
          this.games3DaysAgo = data;
          localStorage.setItem("games3daysago" + champId, JSON.stringify(data));
        }
      )
    } else {
      this.games3DaysAgo = JSON.parse(localStorage.getItem("games3daysago" + champId) ?? '[]');
    }
  }

  /**
   * Updates the games of the selected championship for tomorrow.
   * @param champId - The championship ID.
   */
  updateChampionshipTomorrow(champId: number) {
    this.selectedChampionshipId = champId;
    const championshipId = {
      params: {'championshipId': champId}
    }
    if (localStorage.getItem("gamesTomorrow" + champId) === null) {
      this.http.get<Game[]>('/api/general/gamestomorrow/' + this.username, championshipId).subscribe(
        data => {
          console.log(data);
          this.gamesTomorrow = data;
          localStorage.setItem("gamesTomorrow" + champId, JSON.stringify(data));
        }
      )
    } else {
      this.gamesTomorrow = JSON.parse(localStorage.getItem("gamesTomorrow" + champId) ?? '[]');
    }
  }

  /**
   * Updates the games of the selected championship for 2 days later.
   * @param champId - The championship ID.
   */
  updateChampionship2dayslater(champId: number) {
    this.selectedChampionshipId = champId;
    const championshipId = {
      params: {'championshipId': champId}
    }
    if (localStorage.getItem("games2dayslater" + champId) === null) {
      this.http.get<Game[]>('/api/general/games2dayslater/' + this.username, championshipId).subscribe(
        data => {
          console.log(data);
          this.games2DaysLater = data;
          localStorage.setItem("games2dayslater" + champId, JSON.stringify(data));
        }
      )
    } else {
      this.games2DaysLater = JSON.parse(localStorage.getItem("games2dayslater" + champId) ?? '[]');
    }
  }

  /**
   * Updates the games of the selected championship for 3 days later.
   * @param champId - The championship ID.
   */
  updateChampionship3dayslater(champId: number) {
    this.selectedChampionshipId = champId;
    const championshipId = {
      params: {'championshipId': champId}
    }
    if (localStorage.getItem("games3dayslater" + champId) === null) {
      this.http.get<Game[]>('/api/general/games3dayslater/' + this.username, championshipId).subscribe(
        data => {
          console.log(data);
          this.games3DaysLater = data;
          localStorage.setItem("games3dayslater" + champId, JSON.stringify(data));
        }
      )
    } else {
      this.games3DaysLater = JSON.parse(localStorage.getItem("games3dayslater" + champId) ?? '[]');
    }
  }


  /**
   * Opens a dialog to display detailed information about a game.
   * @param game - The game object.
   * @param date - The date for the specific tab as a string.
   */
  openDialogForGame(game: Game, date: string) {
    const dialogRef = this.dialog.open(DialogcontentgameComponent, {
      data: {gameId: game.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (date) {
        case("today"):
          localStorage.removeItem("gamesToday" + this.selectedChampionshipId);
          this.updateChampionshipToday(this.selectedChampionshipId);
          break;
        case("yesterday"):
          localStorage.removeItem("gamesYesterday" + this.selectedChampionshipId);
          this.updateChampionshipYesterday(this.selectedChampionshipId);
          break;
        case("2daysago"):
          localStorage.removeItem("games2daysago" + this.selectedChampionshipId);
          this.updateChampionship2daysago(this.selectedChampionshipId);
          break;
        case("3daysago"):
          localStorage.removeItem("games3daysago" + this.selectedChampionshipId);
          this.updateChampionship3daysago(this.selectedChampionshipId);
          break;
        case("tomorrow"):
          localStorage.removeItem("gamesTomorrow" + this.selectedChampionshipId);
          this.updateChampionshipTomorrow(this.selectedChampionshipId);
          break;
        case("2dayslater"):
          localStorage.removeItem("games2dayslater" + this.selectedChampionshipId);
          this.updateChampionship2dayslater(this.selectedChampionshipId);
          break;
        case("3dayslater"):
          localStorage.removeItem("games3dayslater" + this.selectedChampionshipId);
          this.updateChampionship3dayslater(this.selectedChampionshipId);
          break;
      }
      console.log(`Dialog result: ${result}`);
    });
  }


  /**
   * Logs out the user and navigates to the login page.
   */
  logout() {
    this.authService.logout();
    this.themeService.setDarkMode(false);
    this.router.navigate(['/login']);
  }

  /**
   * Navigates to the favorites page.
   */
  gotofavs() {
    this.router.navigate(['/user/favourites']);
  }

  /**
   * Navigates to the personal data page.
   */
  gotomyaccount() {
    this.router.navigate(['/user/personaldata']);
  }

  /**
   * Navigates to the home page.
   */
  gohome() {
    this.router.navigate(['/user/home']);
  }
}
