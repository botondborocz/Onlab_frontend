import {Component} from '@angular/core';
import {ThemeService} from "../theme.service";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.scss',
  providers: []
})
export class UserdashboardComponent {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
    themeService.setDarkMode(false);
  }
}
