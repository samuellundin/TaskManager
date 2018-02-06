import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  usernameTaken: boolean = false;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {

  }

  register() {
    this.authenticationService.registerUser(this.model).subscribe(data => {

    }, error => {
      this.usernameTaken = true;
    });
  }

  passwordMatch(): boolean {
    return this.model.password == this.model.confirmPassword;
  }



}
