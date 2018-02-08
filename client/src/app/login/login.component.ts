import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {CategoryService} from "../service/category.service";
import {User} from "../model/user";
import {Category} from "../model/category";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  unauthorized: boolean = false;
  standardCategoryExists: boolean;
  standardCategory:any;
  previousUser:boolean;
  count:number;

  constructor(private authenticationService: AuthenticationService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.previousUser = true;
    this.count = 0;
  }

  login() {
    console.log(this.model);
    this.standardCategoryExists = false;
    this.authenticationService.login(this.model).subscribe(data => {
      console.log(data);

    }, error => {
      this.unauthorized = true;
    });
  }
}
