import {Injectable} from '@angular/core';
import {CanActivate, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LOCALSTORAGE_TOKEN_KEY, LOCALSTORAGE_TYPE_KEY} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor() {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) === null || localStorage.getItem(LOCALSTORAGE_TYPE_KEY) === 'user') {
      return false;
    } else {
      return true;
    }
  }
}
