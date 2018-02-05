import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {TasksComponent} from "./tasks/tasks.component";
import {ProfileComponent} from "./profile/profile.component";
import {AboutComponent} from "./about/about.component";
import {LoginComponent} from "./login/login.component";
import {AuthenticationGuard} from "./security/authentication.guard";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'tasks', component: TasksComponent, canActivate: [ AuthenticationGuard ] },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthenticationGuard ] },
  { path: 'about', component: AboutComponent },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

