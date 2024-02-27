import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}

export const LOCALSTORAGE_TOKEN_KEY = 'nyilvantartas-auth-token';
export const LOCALSTORAGE_TYPE_KEY= 'nyilvantartas-type';

// specify tokenGetter for the angular jwt package
export function getUserName() {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}
