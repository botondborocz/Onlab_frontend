import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-adminpersonaldata',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterModule ,MatIconModule,MatButtonModule,MatTabsModule,MatSlideToggleModule,MatMenuModule],
  templateUrl: './adminpersonaldata.component.html',
  styleUrl: './adminpersonaldata.component.scss'
})
export class AdminpersonaldataComponent {
  constructor(private authService: AuthService, private router:Router){}

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  gohome(){
      this.router.navigate(['/admin/home']);
  }
}
