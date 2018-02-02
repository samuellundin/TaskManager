import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.currentUser = this.userService.getUser();
    this.userService.getUser();
  }



}
