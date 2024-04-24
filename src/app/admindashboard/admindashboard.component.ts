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
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog, MatDialogModule,} from '@angular/material/dialog';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {DialogcontentaddgameComponent} from '../admindashboard/dialogcontent/dialogcontentaddgame/dialogcontentaddgame.component';
import {DialogcontentaddscoreComponent} from '../admindashboard/dialogcontent/dialogcontentaddscore/dialogcontentaddscore.component';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterModule ,MatIconModule,
    MatButtonModule,CommonModule,MatTabsModule,MatSlideToggleModule,
    MatMenuModule,MatFormFieldModule, MatInputModule, FormsModule, 
    MatButtonModule, MatTableModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent {
  constructor(private authService: AuthService, private router:Router, private dialog:MatDialog, private http:HttpClient){}  


  openDialogForScore() {
    const dialogRef = this.dialog.open(DialogcontentaddscoreComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogForGame() {
    const dialogRef = this.dialog.open(DialogcontentaddgameComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  

    logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    gotomyaccount(){
      this.router.navigate(['/admin/personaldata']);
    }

    gohome(){
      this.router.navigate(['/admin/home']);
    }
}

