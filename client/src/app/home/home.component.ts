import {Component, Injectable, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {CategoryService} from "../service/category.service";
import {TaskService} from "../service/task.service";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  currentUser: any;

  categoriesByUser: any;
  categories: any;

  tasks: any;
  users: any;

  categoryTitles: any;

  taskTitles: any;
  taskStartDates: any;
  taskEndDates: any;



  constructor(private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private userService: UserService,
              private taskService: TaskService) {}

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
      console.log("currentUser: " + currentUser.userId + ", " + currentUser.firstName);
    });

    this.categoryService.getCategoryByUserId(this.currentUser.userId).subscribe(categoriesByUser => {
      this.categoriesByUser = categoriesByUser;
      console.log(categoriesByUser);

      this.categoriesByUser.forEach(item => {
        if(item.categoryId > 1) {
          //Generate div
        }
      })

    });

    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log(users)
    });

    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;

    });

  }}

/*this.taskStartDates = moment(this.tasks.startDate).format('YYYY-MM-DD');
      this.taskEndDates = moment(this.tasks.endDate).format('YYYY-MM-DD');
      console.log(Object.values(tasks));
    });

this.categories.forEach(item => {
        if(item.user.userId == this.currentUser.userId) {
       //console.log("UserId: "+item.user.userId);
       //console.log(this.categoryTitles + " belongs to " + this.currentUser.firstName);
       });

for(let i in categories) {
  if(categories[i].userId == 11)
    console.log("true");
else
  console.log("false");

for(let i in categories) {
  if(categories[i].userId == 3)
    console.log("Id is :"+ parseInt(i));
}

for(let i in categories) {
  if(categories[this.categoryIndex].title == "Mother, Jugs & Speed")
    console.log("Index is :"+ parseInt(this.categoryIndex));
}

this.categories.forEach(item => {
  if(item.categoryId == 2)
    this.categoryTitles = item.title;
  console.log("title is: " + item.title);
});*/
