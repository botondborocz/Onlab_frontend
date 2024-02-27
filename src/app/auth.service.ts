import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from './interfaces';
import { Observable, tap } from 'rxjs';
import { LOCALSTORAGE_TOKEN_KEY, LOCALSTORAGE_TYPE_KEY } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }
  
  login(loginRequest: LoginRequest, url:string): Observable<LoginResponse> {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
    return this.http.post<LoginResponse>(url, loginRequest).pipe(
    tap((res: LoginResponse) => {
      console.log("tap");
      localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.username);
      localStorage.setItem(LOCALSTORAGE_TYPE_KEY, res.type);
    })
    );
  }

  register(user: User, url:string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(url, user);
  }

  getUserName() {
    return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
  }

  getUserType(){
    return localStorage.getItem(LOCALSTORAGE_TYPE_KEY)
  }

  logout(){
    localStorage.clear();
  }
}
