import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from "angular2-cookie/services/cookies.service";

import { UserService } from './user.service';

@Injectable()
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router, private guard: UserService, private cookie: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.guard.isLoggedIn.value)
      return true;

    this.router.navigate(['login']);
    return false;
  }

  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let login = this.cookie.get('user.login');
    if (login != "") {
      this.guard.isLoggedIn.next(true);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }


}