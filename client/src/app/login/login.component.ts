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

    this.authenticationService.getCurrentUser().subscribe(user => {
      console.log("model:" + this.model.username);
      if(user)console.log("user:" + user.username);
      else console.log("no user");
      if(user && this.model.username == user.username) {
        if(this.count < 1) {
          this.count++;
          this.createStandardCategory(user);
        }
      }
    });
  }

  createStandardCategory(user) {

    console.log("inside createStandardCategory() with userId " + user.userId);
    this.categoryService.getCategoryByUserId(user.userId).subscribe(categories => {
      console.log("after getCategoryByUserId()");
      let categoryList:any = categories;
      console.log("categoryList:");
      console.log(categoryList);
      for(let category of categoryList) {
        if(category.title == "Standard") {
          this.standardCategoryExists = true;
        }
      }
      console.log("standardCategoryExists?" + this.standardCategoryExists);
      if(!this.standardCategoryExists) {
        console.log("Create standard category");
        this.standardCategory = new Category();
        this.standardCategory.title = "Standard";
        this.standardCategory.user = user;
        this.categoryService.registerCategory(this.standardCategory).subscribe(data => {
          console.log(data);
        });
      }

    });
  }

}
