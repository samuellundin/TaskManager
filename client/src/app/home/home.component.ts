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

  idFailAlertIsHidden: boolean;
  taskSavedAlertIsHidden: boolean;
  titleInputFailAlertIsHidden: boolean;
  categoryInputFailAlertIsHidden: boolean;

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

    this.idFailAlertIsHidden = true;
    this.taskSavedAlertIsHidden = true;
    this.titleInputFailAlertIsHidden = true;
    this.categoryInputFailAlertIsHidden = true;

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
  }

  onChangeCategory(categoryId: number) {
    this.selectedCategory = categoryId;
    if (this.selectedCategory == 0) {
      this.tasksByCategory = this.tasks;
    } else {
      this.tasksByCategory = this.tasks.filter((task) => task.category.categoryId == categoryId);
    }
  }

  showIdFailAlert() {
    this.idFailAlertIsHidden = false;
    setTimeout(() =>
      {
        this.hideIdFailAlert();
      },
      3500);
  }
  hideIdFailAlert() { this.idFailAlertIsHidden = true }

  showTaskSavedAlert() {
    this.taskSavedAlertIsHidden = false;
    setTimeout(() =>
      {
        this.hideTaskSavedAlert();
      },
      3500);
  }
  hideTaskSavedAlert() { this.taskSavedAlertIsHidden = true }

  showTitleInputFailAlert() {
    this.titleInputFailAlertIsHidden = false;
    setTimeout(() =>
      {
        this.hideTitleInputFailAlert();
      },
      3500);
  }
  hideTitleInputFailAlert() { this.titleInputFailAlertIsHidden = true }

  showCategoryInputFailAlert() {
    this.categoryInputFailAlertIsHidden = false;
    setTimeout(() =>
      {
        this.hideCategoryInputFailAlert();
      },
      3500);
  }
  hideCategoryInputFailAlert() { this.categoryInputFailAlertIsHidden = true }

  onSubmit(form: any): void {
    let task: Task = new Task();

    console.log(form);

    if(this.selectedTask.taskId == null) {
      this.showIdFailAlert();
    } else if(this.currentUser.userId == null) {
      this.showIdFailAlert();
    } else {
    task.user = this.currentUser;
    task.taskId = this.selectedTask.taskId;
    }

    if((form.startDate == "" && form.endDate == "")) {
      task.startDate = new Date(Date.now());
      task.endDate = new Date(Date.now());
    } else if (form.endDate == ""){
      task.startDate = new Date(form.startDate + " " + form.startTime + ":00");
      task.endDate = new Date(form.startDate + " " + form.startTime + ":00");
    } else if (form.startDate == ""){
      task.startDate = new Date(Date.now());
      task.endDate = new Date(form.endDate + " " + form.endTime + ":00");
    } else {
      task.startDate = new Date(form.startDate + " " + form.startTime + ":00");
      task.endDate = new Date(form.endDate + " " + form.endTime + ":00");
    }

    if(form.title == "") {
      this.showTitleInputFailAlert();
    } else if(form.category == "") {
      this.showCategoryInputFailAlert();
    } else {
      task.title = form.title;
      task.description = form.description;
    }

      this.categoryService.getAllCategories().subscribe(categories => {
        let categoryObj:any;

        categoryObj = categories;

        for(let category of categoryObj) {
          if(category.title == this.selectedCategory) {
            task.category = category;
          }
        }

        this.taskService.updateTask(task).subscribe(response => {
          this.showTaskSavedAlert();
        });
      });

  }
}
