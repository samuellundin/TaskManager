import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {

  }

  login() {
    this.authenticationService.login(this.model);
  }

}
