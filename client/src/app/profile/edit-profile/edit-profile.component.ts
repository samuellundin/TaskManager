import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  oldPassword: string = '';
  model: any = {};
  usernameTaken: boolean = false;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(user => {
      this.model = user;
      this.oldPassword = user.password;
      this.model.password = '';
    })
  }

  save() {
    if(!this.model.password) {
      this.model.password = this.oldPassword;
    }
    this.authenticationService.updateUser(this.model).subscribe(data => {
        this.router.navigate(['/profile']);
    }, error => {
      this.model.password = '';
      this.usernameTaken = true;
    });
  }


  cancel() {
    this.router.navigate(['/profile']);
  }

  passwordMatch(): boolean {
    if(this.model.password && this.model.confirmPassword) {
      if(this.model.password.length < 1 && this.model.confirmPassword.length < 1) {
        return this.model.password == this.model.confirmPassword;
      }
    } else {
      return false;
    }
  }

}
