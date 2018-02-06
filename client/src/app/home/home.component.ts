import {Component, Injectable, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {CategoryService} from "../service/category.service";
import {TaskService} from "../service/task.service";
import {AuthenticationService} from "../service/authentication.service";
import {Category} from "../model/category";
import {Task} from '../model/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  currentUser: any;
  categoriesByUser: any;
  categories: any[] = [];
  users: any;
  tasks: Task[];
  tasksByCategory: Task[];
  taskToDelete: any;

  selectedCategory: number = 0;

  tasksByCategoryId: any;

  bool: any;

  startDate: any;
  endDate: any;

  constructor(private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private userService: UserService,
              private taskService: TaskService) {}

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
      if(this.currentUser) {
        this.taskService.getAllTasksByUserId(this.currentUser.userId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
          this.tasksByCategory = tasks;
        });
        this.categoryService.getCategoryByUserId(this.currentUser.userId).subscribe((categories: Category[]) => {
          let category = new Category();
          category.categoryId = 0;
          category.title = "All Categories";
          category.user = this.currentUser;
          this.categories.push();
          categories.forEach(cat => {
            this.categories.push(cat);
          });
          console.log(this.categories)
        });
      }
    });


    /*this.taskService.getTaskByCategoryId(this.selectedCategory).subscribe(tasksByCategoryId => {
      this.tasksByCategoryId = tasksByCategoryId;
      console.log(tasksByCategoryId);
    });*/


    /*this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log(users)
    });

    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;

      for(let task of this.tasks) {
        task.startDate = new Date(task.startDate * 1000);
        task.endDate = new Date(task.endDate * 1000);
      }
    });*/

  }

  deleteTask(task) {
    this.taskToDelete = task;
  }

  //get selected category
  onChangeCategory(categoryId: number) {
    if(categoryId == 0) {
      this.tasksByCategory = this.tasks;
    } else {
      this.tasksByCategory = this.tasks.filter((task) => task.category.categoryId == categoryId);
    }
  }

}


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
