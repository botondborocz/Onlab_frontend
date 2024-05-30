import {Component} from '@angular/core';
import {ThemeService} from "../theme.service";
import {RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent {
  constructor(private themeService: ThemeService) {
    this.isDarkMode = themeService.isDarkMode();
  }

  isDarkMode: boolean;

}
