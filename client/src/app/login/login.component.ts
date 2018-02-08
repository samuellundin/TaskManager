import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {CategoryService} from "../service/category.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  unauthorized: boolean = false;

  constructor(private authenticationService: AuthenticationService, private categoryService: CategoryService) {}

  ngOnInit() { }

  login() {
    console.log(this.model);
    this.authenticationService.login(this.model).subscribe(data => {
      console.log(data);

    }, error => {
      this.unauthorized = true;
    });
  }
}
