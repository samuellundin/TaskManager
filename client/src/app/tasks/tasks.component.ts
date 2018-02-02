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

  newCategoryIsHidden:boolean;
  oneDateFieldIsHidden:boolean;
  twoDatesFieldIsHidden:boolean;
  selectedCategory:string;
  finalCategory:any;

  constructor(private taskService: TaskService, private categoryService: CategoryService, private userService: UserService) { }

  ngOnInit() {
    this.newCategoryIsHidden = true;
    this.oneDateFieldIsHidden = true;
    this.twoDatesFieldIsHidden = true;
  }

  showNoDateOption() {
    this.oneDateFieldIsHidden = true;
    this.twoDatesFieldIsHidden = true;
  }

  showOneDateOption() {
    this.oneDateFieldIsHidden = false;
    this.twoDatesFieldIsHidden = true;
  }

  showTwoDatesOption() {
    this.oneDateFieldIsHidden = false;
    this.twoDatesFieldIsHidden = false;
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
        console.log(response);
        this.finalCategory = response;
      });
    });

  }

  onSubmit(form: any): void {
    console.log(form.startDate);
    let task: Task = new Task();

    task.title = form.title;
    task.description = form.description;

    if(form.startDate) task.startDate = new Date(form.startDate);
    else task.startDate = null;
    if(form.endDate) task.endDate = new Date(form.endDate);
    else task.endDate = null;

    task.category = this.finalCategory; //TODO: om man valt en kategori som redan fanns i listan måste denna kopplas in här
    task.user = null; //TODO: hämta inloggad user


    this.taskService.registerTask(task).subscribe(response => {
      console.log(response);
    });



  }
}
