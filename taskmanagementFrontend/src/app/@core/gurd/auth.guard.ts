import {inject, Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('validUser') == 'true') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
