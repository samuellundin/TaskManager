import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private userService: UserService) {}

  ngOnInit() {

  }

  register() {
    console.log(this.model);
    let user: User = new User;
    user.username = this.model.email;
    user.password = this.model.password;
    user.firstName = this.model.firstName;
    user.lastName = this.model.lastName;
    this.userService.registerUser(user).subscribe(response => {
      console.log(response);
    });
  }

}
