import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LOCALSTORAGE_TOKEN_KEY, LOCALSTORAGE_TYPE_KEY } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardProf  implements CanActivate{

  constructor() { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) === null || localStorage.getItem(LOCALSTORAGE_TYPE_KEY)==='student') {
      return false;
    } else {
      return true;
    }
  }
}
