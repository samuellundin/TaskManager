import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {

  }

  register() {
    console.log(this.model);
    this.authenticationService.registerUser(this.model);
  }



}
