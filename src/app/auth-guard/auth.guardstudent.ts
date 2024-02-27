import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LOCALSTORAGE_TOKEN_KEY, LOCALSTORAGE_TYPE_KEY } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardStud  implements CanActivate{

  constructor( ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(localStorage.getItem(LOCALSTORAGE_TOKEN_KEY))
    if (localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) === null || localStorage.getItem(LOCALSTORAGE_TYPE_KEY)==='professor') {
      //this.router.navigate(['']);
      console.log(localStorage.getItem(LOCALSTORAGE_TOKEN_KEY));
      console.log(localStorage.getItem(LOCALSTORAGE_TYPE_KEY))
      return false;
    } else {
      return true;
    }
  }
}
