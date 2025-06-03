import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {TaskComponent} from './views/task/task.component';
import {AuthGuard} from './@core/gurd/auth.guard';

const routes: Routes = [
  {
    path: 'login', component : LoginComponent
  },
  {
    path:'task', component: TaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'logout',
    pathMatch:'full',
    redirectTo:'/login'
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
