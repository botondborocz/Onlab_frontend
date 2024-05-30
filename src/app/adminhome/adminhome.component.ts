import {Component, ViewEncapsulation} from '@angular/core';
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
import {MatDialog,} from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {
  DialogcontentaddgoalscorersComponent
} from './dialogcontent/dialogcontentaddgoalscorers/dialogcontentaddgoalscorers.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DialogcontentaddscoreComponent} from './dialogcontent/dialogcontentaddscore/dialogcontentaddscore.component';
import {ThemeService} from "../theme.service";
import {DialogcontentaddgameComponent} from "./dialogcontent/dialogcontentaddgame/dialogcontentaddgame.component";
import {Game} from "../interfaces";

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterModule,
    MatIconModule, MatButtonModule, CommonModule, MatTabsModule,
    MatSlideToggleModule, MatMenuModule, MatTableModule,
    MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatFormField, MatInput, MatSuffix, MatNativeDateModule],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class AdminhomeComponent {
  games = new MatTableDataSource<Game>();
  columnsToDisplay = ["date", "homeTeamName", "homeScore", "awayScore", "awayTeamName", "score", "goalscorers", "delete"];
  isDarkMode: boolean;

  constructor(private themeService: ThemeService, private authService: AuthService, private router: Router, private dialog: MatDialog, private http: HttpClient) {
    this.isDarkMode = this.themeService.isDarkMode();
    this.getDataFromBackEnd();
  }

  /**
   * Retrieves game data for every game from the backend.
   */
  getDataFromBackEnd() {
    this.http.get<Game[]>("/api/general/allgames").subscribe(
      games => {
        console.log(games);
        this.games.data = games
      }
    )
  }

  /**
   * Opens a dialog to add or update the score for a game.
   * @param game - The game for which the score is to be added or updated.
   */
  openDialogForScore(game: Game) {
    const dialogRef = this.dialog.open(DialogcontentaddscoreComponent, {
      data: {gameId: game.id, homeTeamName: game.homeTeamName, awayTeamName: game.awayTeamName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataFromBackEnd();
    });
  }

  /**
   * Opens a dialog to add goalscorers for a game.
   * @param game - The game for which the goalscorers are to be added.
   */
  openDialogForGoalscorers(game: Game) {
    const dialogRef = this.dialog.open(DialogcontentaddgoalscorersComponent, {
      data: {gameId: game.id, homeTeamName: game.homeTeamName, awayTeamName: game.awayTeamName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataFromBackEnd();
    });
  }

  /**
   * Opens a dialog to add a new game.
   */
  openDialogForGame() {
    const dialogRef = this.dialog.open(DialogcontentaddgameComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getDataFromBackEnd();
    });
  }

  /**
   * Deletes a game.
   * @param game - The game to be deleted.
   */
  deleteGame(game: Game) {
    const gameId = {
      params: {"gameId": game.id}
    }
    this.http.delete("/api/admin", gameId).subscribe({
      error: error => {
        console.error('There was an error!', error);
      },
      complete: () => {
        this.getDataFromBackEnd()
      }
    });
  }

  /**
   * Toggles between light and dark theme.
   */
  public toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  /**
   * Navigates to the admin home page.
   */
  gohome() {
    this.router.navigate(['/admin/home']);
  }

  /**
   * Logs out the admin and navigates to the login page.
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.themeService.setDarkMode(false);
  }

  /**
   * Navigates to the user's account page.
   */
  gotomyaccount() {
    this.router.navigate(['/admin/personaldata']);
  }
}
