import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounce, debounceTime, distinctUntilChanged, interval} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginform: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  errors:any = {
    username:'',
    password:'',
  }

  constructor(private _router:Router, private _authService: AuthService) {
    if(localStorage.getItem('validUser'))
      localStorage.removeItem('validUser')
    this.loginform.get('username')?.valueChanges.pipe(debounce(()=> interval(1000)),distinctUntilChanged()).subscribe(value=>{
     if(this.errors.username != '')
       this.errors.username = ''
    })
    this.loginform.get('password')?.valueChanges.pipe(debounce(()=> interval(1000)),distinctUntilChanged()).subscribe(value=>{
      if(this.errors.password != '')
        this.errors.password = ''
    })
  }


  submit() {
    if (this.loginform.valid) {
      this._authService.loginUser(this.loginform.get('username')?.value,this.loginform.get('password')?.value).subscribe((res:any)=>{
        console.log(res)
        localStorage.setItem('loginUser',res['userName'])
        localStorage.setItem('validUser', 'true')
        this._router.navigate(['task'])
      })
    }else{
      if(this.loginform.get('username')?.value == ''){
          this.errors.username = 'Please enter Username'
      }
      if(this.loginform.get('password')?.value == ''){
        this.errors.password = 'Please enter Password'
      }
    }
  }
}
