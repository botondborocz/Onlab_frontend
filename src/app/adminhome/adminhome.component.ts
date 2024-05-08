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
} from '../admindashboard/dialogcontent/dialogcontentaddgoalscorers/dialogcontentaddgoalscorers.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  DialogcontentaddscoreComponent
} from '../admindashboard/dialogcontent/dialogcontentaddscore/dialogcontentaddscore.component';
import {ThemeService} from "../theme.service";
import {
  DialogcontentaddgameComponent
} from "../admindashboard/dialogcontent/dialogcontentaddgame/dialogcontentaddgame.component";

export interface Game {
  id: number
  homeTeamName: string
  awayTeamName: string
  homeScore: number
  awayScore: number
  championship: string
  date: Date
}

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
  columnsToDisplay = ["date", "homeTeamName", "homeScore", "awayScore", "awayTeamName", "score", "goalscorers"];
  isDarkMode: boolean;

  constructor(private themeService: ThemeService, private authService: AuthService, private router: Router, private dialog: MatDialog, private http: HttpClient) {
    this.isDarkMode = this.themeService.isDarkMode();
    this.getDatafromBackEnd();
  }


  getDatafromBackEnd() {
    this.http.get<Game[]>("/api/general/allgames").subscribe(
      games => {
        console.log(games);
        this.games.data = games
      }
    )
  }

  openDialogForScore(game: Game) {
    const dialogRef = this.dialog.open(DialogcontentaddscoreComponent, {
      data: {gameId: game.id, homeTeamName: game.homeTeamName, awayTeamName: game.awayTeamName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDatafromBackEnd();
    });
  }

  openDialogForGoalscorers(game: Game) {
    const dialogRef = this.dialog.open(DialogcontentaddgoalscorersComponent, {
      data: {gameId: game.id, homeTeamName: game.homeTeamName, awayTeamName: game.awayTeamName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDatafromBackEnd();
    });
  }

  openDialogForGame() {
    const dialogRef = this.dialog.open(DialogcontentaddgameComponent);

    dialogRef.afterClosed().subscribe(result => {
      //TODO refresh after closing
      console.log(`Dialog result: ${result}`);
      this.getDatafromBackEnd();
    });
  }

  public toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  gohome() {
    this.router.navigate(['/admin/home']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.themeService.setDarkMode(false);
  }

  gotomyaccount() {
    this.router.navigate(['/admin/personaldata']);
  }
}
