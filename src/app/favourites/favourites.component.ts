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
    console.log("AAA")
    if (this.favorites.length > 0) {
      this.favorites[0].selected = true;
    }
  }

  public getFavorites() {
    this.http.get<Team[]>("/api/user/favoriteteams/" + this.username).subscribe(
      data => {
        console.log(data);
        this.favorites = data;
        console.log(this.favorites.length)
      }
    )
  }

  public getFavoriteGames(team: Team) {
    this.favorites.forEach(function (team) {
      team.selected = false;
    })
    team.selected = true;
    this.getFavoriteGamesBefore(team);
    this.getFavoriteGamesAfter(team);
  }

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

  openDialogForGame(game: Game) {
    console.log(game.date);
    const dialogRef = this.dialog.open(DialogcontentgameComponent, {
      data: {gameId: game.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getFavorites();
    });
  }

  public toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  logout() {
    this.authService.logout();
    this.themeService.setDarkMode(false);
    this.router.navigate(['/login']);
  }

  gotofavs() {
    this.router.navigate(['/user/favourites']);
  }

  gotomyaccount() {
    this.router.navigate(['/user/personaldata']);
  }

  gohome() {
    this.router.navigate(['/user/home']);
  }
}
