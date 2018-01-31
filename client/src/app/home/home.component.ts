import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/user";
import {CategoryService} from "../service/category.service";
import {TaskService} from "../service/task.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: any;
  tasks: any;
  categories: any;

  constructor(private userService: UserService,
              private taskService: TaskService,
              private categoryService: CategoryService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log(users)
    });
  }

}

