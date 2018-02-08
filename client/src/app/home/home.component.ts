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
  tasks: any[];
  tasksByCategory: Task[];
  selectedTask: any = {};
  selectedCategory: number = 0;
  startDate: any;
  endDate: any;

  model: any = {};
  taskSavedAlertIsHidden:boolean;

  taskStartDate: any;
  taskStartTime: any;
  taskEndDate: any;
  taskEndTime: any;

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

          for(let task of this.tasks) {
            task.startDate = new Date(task.startDate * 1000);
            task.endDate = new Date(task.endDate * 1000);
          }

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

    this.taskSavedAlertIsHidden = true;

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

  editModal(task) {
    this.selectedTask = task;
    this.model = task;
  }

  onChangeCategory(categoryId: number) {
    this.selectedCategory = categoryId;
    if (this.selectedCategory == 0) {
      this.tasksByCategory = this.tasks;
    } else {
      this.tasksByCategory = this.tasks.filter((task) => task.category.categoryId == categoryId);
    }
  }

  showTaskSavedAlert() {
    this.taskSavedAlertIsHidden = false;
    setTimeout(() =>
      {
        this.hideTaskSavedAlert();
      },
      3500);
  }
  hideTaskSavedAlert() { this.taskSavedAlertIsHidden = true }

  update() {

    this.model.user = this.currentUser;

    this.model.startDate = new Date(this.taskStartDate + " " + this.taskStartTime + ":00");
    this.model.endDate = new Date(this.taskEndDate + " " + this.taskEndTime + ":00");
    console.log(this.model.startDate);


      this.taskService.updateTask(this.model).subscribe(data => {
        console.log(data);
        console.log(this.model.startDate);
        this.showTaskSavedAlert();
      });
  }

}
