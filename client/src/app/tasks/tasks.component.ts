import { Component, OnInit } from '@angular/core';
import {Task} from "../model/task";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  newCategoryIsHidden:boolean;
  oneDateFieldIsHidden:boolean;
  twoDatesFieldIsHidden:boolean;

  private _prevSelected: any;

  constructor() { }

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

  showNewCategory() {
    if(this.newCategoryIsHidden) this.newCategoryIsHidden = false;
    else this.newCategoryIsHidden = true;
  }

  addNewCategoryToSelection(title:string) {
    console.log(title);

    let newOption = document.createElement("option");
    newOption.text = title;
    newOption.value = title;

    let select = document.getElementById("inputCategory");
    select.appendChild(newOption);
    newOption.selected = true;

    this.showNewCategory();
  }

  onSubmit(form: any): void {
    let task: Task = new Task();

    task.title = form.title;
    task.description = form.description;

    if(form.startDate) task.startDate = form.startDate;
    else task.startDate = null;
    if(form.endDate) task.endDate= form.endDate;
    else task.endDate = null;

    task.category = form.category;
    task.user = null;

    console.log(task)
  }

}
