import {AfterViewInit, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
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
import {provideAnimations} from "@angular/platform-browser/animations";

export interface Game {
  id: number
  homeTeamName: string
  awayTeamName: string
  homeTeamId: number
  awayTeamId: number
  homeScore: number
  awayScore: number
  homeFavorite: boolean
  awayFavorite: boolean
  date: Date
}

export interface Championship {
  id: number
  name: string
  selected: boolean
}

@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterModule, MatIconModule,
    MatButtonModule, CommonModule, MatTabsModule, MatSlideToggleModule,
    MatMenuModule, MatTableModule, MatButtonToggleModule],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [provideAnimations()]
})
export class UserhomeComponent implements AfterViewInit {
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
        this.championships = data
        this.updateChampionship(this.championships[0].id);
        this.championships[0].selected = true;
      }
    )
  }

  ngAfterViewInit(): void {
    this.ref.detectChanges();
  }

  public toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
    this.ref.detectChanges();
  }

  public changeHomeFavorite(game: Game) {
    this.http.post<Game>('/api/user/changehomefavorite/' + this.username, game).subscribe({
        next: (response) => console.log(response),
        error: (error) => {
          //error
        },
        complete: () => {
          this.updateChampionship(this.selectedChampionshipId);
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
          this.updateChampionship(this.selectedChampionshipId);
          console.log(game);
        }
      }
    );
  }

  updateSelection(championship: Championship) {
    this.championships.forEach(function (championship) {
      championship.selected = false;
    })
    championship.selected = true;
    this.updateChampionship(championship.id);
  }


  updateChampionship(champId: number) {

    console.log(champId);
    this.selectedChampionshipId = champId;
    const championshipId = {
      params: {'championshipId': champId}
    }
    this.http.get<Game[]>('/api/general/gamestoday', championshipId).subscribe(
      data => {
        console.log(data);
        this.gamesToday = data
      }
    )
    this.http.get<Game[]>('/api/general/gamesyesterday', championshipId).subscribe(
      data => {
        console.log(data);
        this.gamesYesterday = data
      }
    )
    this.http.get<Game[]>('/api/general/games2daysago', championshipId).subscribe(
      data => {
        console.log(data);
        this.games2DaysAgo = data
      }
    )
    this.http.get<Game[]>('/api/general/games3daysago', championshipId).subscribe(
      data => {
        console.log(data);
        this.games3DaysAgo = data
      }
    )
    this.http.get<Game[]>('/api/general/gamestomorrow', championshipId).subscribe(
      data => {
        console.log(data);
        this.gamesTomorrow = data
      }
    )
    this.http.get<Game[]>('/api/general/games2dayslater', championshipId).subscribe(
      data => {
        console.log(data);
        this.games2DaysLater = data
      }
    )
    this.http.get<Game[]>('/api/general/games3dayslater', championshipId).subscribe(
      data => {
        console.log(data);
        this.games3DaysLater = data
      }
    )
  }


  openDialogForGame(game: Game) {
    console.log(game);
    const dialogRef = this.dialog.open(DialogcontentgameComponent, {
      data: {gameId: game.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateChampionship(this.selectedChampionshipId);
      console.log(`Dialog result: ${result}`);
    });
  }


  logout() {
    this.authService.logout();
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
