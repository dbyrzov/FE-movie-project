import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { BACKEND_URL } from "../config/config";

@Injectable()
export class UserService {
  allowedScreens = {};
  disallowedScreens = [];
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  forceChangePass: BehaviorSubject<any> = new BehaviorSubject(this.getForceChangePass());

  constructor(private http: HttpClient, private router: Router) { }

  login(data): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    });

    // return this.http.post(`${BACKEND_URL}/login?email=${data.email}&password=${data.pass}`, requestOptions);
    return this.http.post(`${BACKEND_URL}/login?email=${data.email}&password=${data.pass}`, data, {
      headers,
      observe: 'response'
    });
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'X-AUTH-TOKEN': this.getToken(),
    });

    return this.http.post(`${BACKEND_URL}/logout`, '', { headers }).pipe(
      map(res => {
        sessionStorage.clear();

        this.isLoggedIn.next(false);
        this.router.navigate(['/login']);

        return res;
      }, err => {
        return err;
      }),
      catchError(error => {
        sessionStorage.clear();

        this.isLoggedIn.next(false);
        this.router.navigate(['/login']);

        return throwError(error);
      })
    );
  }

  setToken(token): void {
    sessionStorage.setItem('imx.user.session', token);
  }

  getToken(): string {
    return sessionStorage.getItem('imx.user.session');
  }


  setForceChangePass({ forceChangePass }) {
    if (forceChangePass) {
      sessionStorage.setItem('imx.changepass', 'true');
      this.forceChangePass.next(true);
    } else {
      sessionStorage.removeItem('imx.changepass');
      this.forceChangePass.next(false);
    }
  }

  getForceChangePass() {
    return sessionStorage.getItem('imx.changepass');
  }
}
