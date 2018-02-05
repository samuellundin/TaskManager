import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './core/navbar/navbar.component';
import {RouterModule} from "@angular/router";
import {FooterComponent} from './core/footer/footer.component';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app.routes";
import {HomeComponent} from './home/home.component';
import {UserService} from "./service/user.service";
import {CategoryService} from "./service/category.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TaskService} from "./service/task.service";
import {RegisterComponent} from './register/register.component';
import {TasksComponent} from './tasks/tasks.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {AboutComponent} from './about/about.component';
import {AuthenticationService} from "./service/authentication.service";
import {AuthenticationInterceptor} from "./security/authentication.interceptor";
import {AuthenticationGuard} from "./security/authentication.guard";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    TasksComponent,
    LoginComponent,
    ProfileComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }, AuthenticationService, UserService, CategoryService, TaskService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
