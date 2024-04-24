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
import {ThemeService} from "../theme.service";
import {UserhomeComponent} from "../userhome/userhome.component";

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet,
    RouterModule, MatIconModule, MatButtonModule,
    CommonModule, MatTabsModule, MatSlideToggleModule,
    MatMenuModule],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.scss',
  providers: [UserhomeComponent]
})
export class UserdashboardComponent {
  isDarkMode: boolean;

  constructor(private comp: UserhomeComponent, private themeService: ThemeService, private authService: AuthService, private router: Router) {
    this.isDarkMode = this.themeService.isDarkMode();
    themeService.setDarkMode(false);
  }


  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.comp.toggleTheme();
    this.themeService.setDarkMode(this.isDarkMode);
    console.log(this.isDarkMode);
    console.log(this.comp.isDarkMode);
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
