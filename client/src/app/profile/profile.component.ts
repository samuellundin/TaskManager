import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/user";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  password: any = {};
  newPassword: string = '';
  confirmNewPassword: string = '';
  currentUser: any;
  updatingUser: boolean = false;
  model: any = {};

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    })
  }

  handleUpdateUser() {
    this.updatingUser = !this.updatingUser;
  }

  saveUpdatedUser() {
    this.userService.updateUser(this.currentUser).subscribe(data => {
      console.log(data)
    });
    console.log(this.currentUser)
  }

  cancelUpdateUser() {
    this.updatingUser = false;
  }
}
