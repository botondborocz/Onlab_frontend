import {Component} from '@angular/core';
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
import {MatTableModule} from '@angular/material/table';
import {
  DialogcontentaddgoalscorersComponent
} from '../admindashboard/dialogcontent/dialogcontentaddgoalscorers/dialogcontentaddgoalscorers.component';

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
    MatSlideToggleModule, MatMenuModule, MatTableModule],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.scss'
})
export class AdminhomeComponent {
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog, private http: HttpClient) {
    this.getDatafromBackEnd();
  }

  games: Game[] = [];
  columnsToDisplay = ["id", "date", "homeTeamName", "homeScore", "awayScore", "awayTeamName", "button"];


  getDatafromBackEnd() {
    this.http.get<Game[]>("/api/general/allgames").subscribe(
      game => {
        console.log(game);
        this.games = game
      }
    )
  }

  openDialogForGoalscorers(game: Game) {
    const dialogRef = this.dialog.open(DialogcontentaddgoalscorersComponent, {
      data: {gameId: game.id, homeTeamName: game.homeTeamName, awayTeamName: game.awayTeamName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  gotomyaccount() {
    this.router.navigate(['/admin/personaldata']);
  }
}
