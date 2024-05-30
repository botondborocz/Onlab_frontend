import {Component} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {AuthService} from '../auth.service';
import {ThemeService} from "../theme.service";
import {MatTableModule} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {LOCALSTORAGE_TOKEN_KEY} from "../app.component";
import {CommonModule} from "@angular/common";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {DialogcontentgameComponent} from "../userhome/dialogcontentgame/dialogcontentgame.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {Game, Team} from "../interfaces";


@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterModule,
    MatIconModule, MatButtonModule, MatTabsModule,
    MatSlideToggleModule, MatMenuModule, MatButtonToggleModule,
    MatTableModule, CommonModule, MatDialogModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
  providers: []
})
export class FavouritesComponent {
  isDarkMode: boolean;
  favorites: Team[] = [];
  gamesBefore: Game[] = [];
  gamesAfter: Game[] = [];
  columnsToDisplayLeft = ["name"];
  columnsToDisplayRight = ["id", "homeTeamName", "homeScore", "awayScore", "awayTeamName", "button"];

  username: string | null = "";

  constructor(private dialog: MatDialog, private http: HttpClient, private themeService: ThemeService, private authService: AuthService, private router: Router) {
    this.isDarkMode = themeService.isDarkMode();
    this.username = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    this.getFavorites();
  }

  /**
   * Retrieves the user's favorite teams.
   */
  public getFavorites() {
    this.http.get<Team[]>("/api/user/favoriteteams/" + this.username).subscribe(
      data => {
        console.log(data);
        this.favorites = data;
        if (this.favorites.length > 0) {
          this.favorites[0].selected = true;
          this.getFavoriteGames(this.favorites[0]);
        }
      }
    )
  }

  /**
   * Retrieves the favorite games for the selected team.
   * @param team - The selected team.
   */
  public getFavoriteGames(team: Team) {
    this.favorites.forEach(function (team) {
      team.selected = false;
    })
    team.selected = true;
    this.getFavoriteGamesBefore(team);
    this.getFavoriteGamesAfter(team);
  }

  /**
   * Retrieves the favorite games before today's date for the selected team.
   * @param team - The selected team.
   */
  public getFavoriteGamesBefore(team: Team) {
    const teamId = {
      params: {'teamId': team.id}
    }
    this.http.get<Game[]>("/api/user/favoritegamesbefore", teamId).subscribe(
      data => {
        console.log(data);
        this.gamesBefore = data;
      }
    )
  }

  /**
   * Retrieves the favorite games after today's date for the selected team.
   * @param team - The selected team.
   */
  public getFavoriteGamesAfter(team: Team) {
    const teamId = {
      params: {'teamId': team.id}
    }
    this.http.get<Game[]>("/api/user/favoritegamesafter", teamId).subscribe(
      data => {
        console.log(data);
        this.gamesAfter = data;
      }
    )
  }

  /**
   * Opens a dialog to display detailed information about a game.
   * @param game - The selected game.
   */
  openDialogForGame(game: Game) {
    const dialogRef = this.dialog.open(DialogcontentgameComponent, {
      data: {gameId: game.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getFavorites();
    });
  }

  /**
   * Toggles the theme between light and dark mode.
   */
  public toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
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
   * Navigates to the user's account page.
   */
  gotomyaccount() {
    this.router.navigate(['/user/personaldata']);
  }

  /**
   * Navigates to the user's home page.
   */
  gohome() {
    this.router.navigate(['/user/home']);
  }
}
