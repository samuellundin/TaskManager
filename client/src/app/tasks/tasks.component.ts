import { Component, OnInit } from '@angular/core';
import {Task} from "../model/task";
import {TaskService} from "../service/task.service";
import {CategoryService} from "../service/category.service";
import {UserService} from "../service/user.service";
import {Category} from "../model/category";
import {User} from "../model/user";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  allCategories:any;
  newCategoryIsHidden:boolean;
  firstDateFieldIsHidden:boolean;
  secondDateFieldIsHidden:boolean;
  selectedCategory:string;
  returnedCategory:any;
  options:any;

  constructor(private taskService: TaskService, private categoryService: CategoryService, private userService: UserService) { }

  ngOnInit() {
    this.newCategoryIsHidden = true;
    this.firstDateFieldIsHidden = true;
    this.secondDateFieldIsHidden = true;

    this.categoryService.getAllCategories().subscribe(categories => {
      this.allCategories = categories;
    });
  }

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

  toggleNewCategory() {
    this.newCategoryIsHidden = !this.newCategoryIsHidden;
  }

  addNewCategoryToSelection(title:string) {
    let newOption = document.createElement("option");
    newOption.text = title;
    newOption.value = title;

    let select = document.getElementById("inputCategory");
    select.appendChild(newOption);
    newOption.selected = true;
    this.selectedCategory = title;

    this.toggleNewCategory();

    let category: Category = new Category();
    category.title = this.selectedCategory;

    //TODO: Nu lägger den till en dummy-user från db. Ändra till att lägga in inloggad user istället.
    this.userService.getAllUsers().subscribe( users => {
      category.user = users[0];
      this.categoryService.registerCategory(category).subscribe(response => {
        console.log("response:");
        console.log(response);
        this.returnedCategory = response;
      });
    });
  }

  onSubmit(form: any): void {
    console.log(form);
    let task: Task = new Task();

    task.title = form.title;
    task.description = form.description;

    task.startDate = new Date(form.startDate + " " + form.startTime + ":00");
    task.endDate = new Date(form.endDate + " " + form.endTime + ":00");

    /*if(form.startDate) task.startDate = form.startDate;
    else task.startDate = null;
    if(form.endDate) task.endDate = form.endDate;
    else task.endDate = null;*/

    task.category = this.returnedCategory; //TODO: om man valt en kategori som redan fanns i listan måste denna kopplas in här

    this.userService.getAllUsers().subscribe(users => {
      task.user = users[0];

      this.taskService.registerTask(task).subscribe(response => {
        console.log(response);
      });
    });

  }
}
