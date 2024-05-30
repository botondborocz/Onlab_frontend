import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RegisterResponse} from './interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  register(user: {
    password: string | null | undefined;
    isAdmin: string | null | undefined;
    username: string | null | undefined
  }, url: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(url, user);
  }

  logout() {
    localStorage.clear();
  }
}
