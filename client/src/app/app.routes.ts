import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {TasksComponent} from "./tasks/tasks.component";
import {ProfileComponent} from "./profile/profile.component";
import {AboutComponent} from "./about/about.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
