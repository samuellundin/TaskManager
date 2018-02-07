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
  categories: any[] = [];
  tasks: Task[];
  tasksByCategory: Task[];
  selectedTask: any = {};
  selectedCategory: number = 0;
  startDate: any;
  endDate: any;


  constructor(private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private userService: UserService,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
      if (this.currentUser) {
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
        });
      }
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.selectedTask.taskId).subscribe(() => {
      let index = this.tasks.findIndex(task => this.selectedTask.taskId == task.taskId);
      this.tasks.splice(index, 1);
      this.onChangeCategory(this.selectedCategory);
      this.selectedTask = {};
    });
  }

  deleteModal(task) {
    this.selectedTask = task;
  }

  onChangeCategory(categoryId: number) {
    this.selectedCategory = categoryId;
    if (this.selectedCategory == 0) {
      this.tasksByCategory = this.tasks;
    } else {
      this.tasksByCategory = this.tasks.filter((task) => task.category.categoryId == categoryId);
    }
  }

  toggle(event) {
    console.log(event.target);
    this.selectedTask = event.target;
  }

  //get selected category
  onChangeTask(taskId) {
    console.log(taskId);
    this.selectedTask = taskId;
    // ...
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
