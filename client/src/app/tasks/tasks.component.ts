import { Component, OnInit } from '@angular/core';
import {Task} from "../model/task";
import {TaskService} from "../service/task.service";
import {CategoryService} from "../service/category.service";
import {UserService} from "../service/user.service";
import {Category} from "../model/category";
import {User} from "../model/user";
import {forEach} from "@angular/router/src/utils/collection";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  currentUser: User;
  userCategories:any;

  newCategoryIsHidden:boolean;
  firstDateFieldIsHidden:boolean;
  secondDateFieldIsHidden:boolean;
  categoryDeleteFailIsHidden:boolean;
  categoryDeleteSuccessIsHidden:boolean;
  taskSavedAlertIsHidden:boolean;

  selectedCategory:string;
  options:any;

  constructor(private taskService: TaskService, private categoryService: CategoryService,
              private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

    this.newCategoryIsHidden = true;
    this.firstDateFieldIsHidden = true;
    this.secondDateFieldIsHidden = true;
    this.categoryDeleteFailIsHidden = true;
    this.categoryDeleteSuccessIsHidden = true;
    this.taskSavedAlertIsHidden = true;

    // Pushes users created categories into list userCategories
    this.categoryService.getAllCategories().subscribe(categories => {
      let categoryList:any;

      categoryList = categories;

      this.userCategories = [];
      for(let cat of categoryList) {
        if(cat.user.username == this.currentUser.username) {
          this.userCategories.push(cat);
        }
      }

      this.userCategories.sort(function(a, b){
        if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      })
    });
  }

  //Date selector
  showNoDateOption() {
    this.firstDateFieldIsHidden = true;
    this.secondDateFieldIsHidden = true;
    this.options = 0;
  }
  showOneDateOption() {
    this.firstDateFieldIsHidden = false;
    this.secondDateFieldIsHidden = true;
    this.options = 1;
  }
  showTwoDatesOption() {
    this.firstDateFieldIsHidden = false;
    this.secondDateFieldIsHidden = false;
    this.options = 2;
  }

  // Category delete alerts
  showCategoryDeleteFailAlert() {
    this.categoryDeleteFailIsHidden = false;
    setTimeout(() =>
      {
        this.hideCategoryDeleteFailAlert();
      },
      3500);
  }
  hideCategoryDeleteFailAlert() { this.categoryDeleteFailIsHidden = true; }
  showCategoryDeleteSuccessAlert() {
    this.categoryDeleteSuccessIsHidden = false;
    setTimeout(() =>
      {
        this.hideCategoryDeleteSuccessAlert();
      },
      3500);
  }
  hideCategoryDeleteSuccessAlert() { this.categoryDeleteSuccessIsHidden = true; }

  showTaskSavedAlert() {
    this.taskSavedAlertIsHidden = false;
    setTimeout(() =>
      {
        this.hideTaskSavedAlert();
      },
      3500);
  }
  hideTaskSavedAlert() { this.taskSavedAlertIsHidden = true }

  toggleShowNewCategory() {
    this.newCategoryIsHidden = !this.newCategoryIsHidden;
  }

  deleteCategory(){
    this.categoryService.getAllCategories().subscribe(categories => {
      let categoryList:any;

      categoryList = categories;

      for(let cat of categoryList) {
        if(this.selectedCategory == 'Standard') {
          this.showCategoryDeleteFailAlert();
        }
        else if(cat.title == this.selectedCategory) {
          this.categoryService.deleteCategory(cat.categoryId).subscribe(response => {
            console.log(response);
            this.showCategoryDeleteSuccessAlert();

            let categoryToRemove = document.getElementById(this.selectedCategory);
            let select = document.getElementById("inputCategory");
            select.removeChild(categoryToRemove);

            try {
              let newSelection:any = document.getElementById(select.children.item(0).id);
              newSelection.selected = true;
              this.selectedCategory = newSelection.id;
            } catch(e) {
              console.log(e);
            }

          });
        }
      }
    });
  }

  // This saves category in db and puts in category selector
  addNewCategoryToSelection(title:string) {
    let newOption = document.createElement("option");
    newOption.text = title;
    newOption.value = title;
    newOption.id = title;

    let select = document.getElementById("inputCategory");
    select.appendChild(newOption);
    newOption.selected = true;
    this.selectedCategory = title;

    this.toggleShowNewCategory();

    let category: Category = new Category();
    category.title = this.selectedCategory;

    category.user = this.currentUser;
      this.categoryService.registerCategory(category).subscribe(response => {
        console.log(response);
      });

  }

  onSubmit(form: any): void {
    console.log(form);
    let task: Task = new Task();

    task.title = form.title;
    task.description = form.description;

    task.startDate = new Date(form.startDate + " " + form.startTime + ":00");
    task.endDate = new Date(form.endDate + " " + form.endTime + ":00");

    task.user = this.currentUser;

    this.categoryService.getAllCategories().subscribe(categories => {
      let categoryList:any;

      categoryList = categories;

      for(let cat of categoryList) {
        if(cat.title == this.selectedCategory) {
          task.category = cat;
        }
      }

      this.taskService.registerTask(task).subscribe(response => {
        console.log(response);
        this.showTaskSavedAlert();
      });
    });

  }
}
