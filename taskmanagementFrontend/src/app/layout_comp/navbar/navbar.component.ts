import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  loginUser = ''
  constructor() {
    this.loginUser = localStorage.getItem('loginUser') ?? '';

  }
}
