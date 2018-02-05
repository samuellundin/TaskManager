import {Component, OnInit} from "@angular/core";
import {UserService} from "../service/user.service";
import {CategoryService} from "../service/category.service";
import {TaskService} from "../service/task.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      console.log(data);
    });
  }

}

