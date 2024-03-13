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
  selector: 'app-adminhome',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterModule ,MatIconModule,MatButtonModule,CommonModule,MatTabsModule,MatSlideToggleModule,MatMenuModule],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.scss'
})
export class AdminhomeComponent {
  constructor(private authService: AuthService, private router:Router){}

    logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    gotomyaccount(){
      this.router.navigate(['/admin/personaldata']);
    }
}
