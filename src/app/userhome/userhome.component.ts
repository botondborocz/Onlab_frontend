import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatDialog, MatDialogModule,} from '@angular/material/dialog';
import {DialogcontentgameComponent} from './dialogcontentgame/dialogcontentgame.component';

export interface Game{
  id:number
  homeTeamName:string
  awayTeamName:string
  homeScore:number
  awayScore:number
}

export interface Championship {
  id:number
  name:string
}

@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterModule ,MatIconModule,
    MatButtonModule,CommonModule,MatTabsModule,MatSlideToggleModule,
    MatMenuModule, MatTableModule],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.scss'
})
export class UserhomeComponent {
  championships: Championship[]=[];
  selectedChampionshipId: number=-1;
  games: Game[]=[]
  columnsToDisplayLeft=["name"];
  columnsToDisplayRight=["id", "homeFavourite", "homeTeamName", "homeScore", "awayScore", "awayTeamName", "awayFavourite"];

  constructor(private authService: AuthService, private router:Router, private http:HttpClient, private dialog:MatDialog){
    this.http.get<Championship[]>('/api/general/allchampionships').subscribe(
      data => {
        console.log(data);
        this.championships=data
        this.updateChampionship(this.championships[0]);
      }
    )
  }

  updateChampionship(championship: Championship) {
    this.selectedChampionshipId=championship.id
    const championshipId={
      params: {'championshipId': championship.id}
    }
    this.http.get<Game[]>('/api/general/games', championshipId).subscribe(
      data => {
        console.log(data);
        this.games=data
      }
    )
  }

  openDialogForGame() {
    const dialogRef = this.dialog.open(DialogcontentgameComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.updateChampionship(this.championships[0]);
    });
  }


  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  gotofavs(){
    this.router.navigate(['/user/favourites']);
  }

  gotomyaccount(){
    this.router.navigate(['/user/personaldata']);
  }
}
