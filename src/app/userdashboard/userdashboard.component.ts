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

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterModule ,MatIconModule,MatButtonModule,CommonModule,MatTabsModule,MatSlideToggleModule,MatMenuModule],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.scss'
})
export class UserdashboardComponent {
  constructor(private authService: AuthService, private router:Router){}

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

    gohome(){
      this.router.navigate(['/user/home']);
    }
}
