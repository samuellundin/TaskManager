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

  model: any = {};
  currentUser: any;
  updatingUser: boolean = false;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    })
  }

  handleUpdateUser() {
    this.model = this.currentUser;
    this.model.password = '';
    this.updatingUser = true;
  }

  saveUpdatedUser() {
    this.userService.updateUser(this.currentUser).subscribe(data => {
      this.currentUser = data;
    });
    console.log(this.currentUser)
  }

  cancelUpdateUser() {
    this.model = {};
    this.authenticationService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
    this.updatingUser = false;
  }

}
