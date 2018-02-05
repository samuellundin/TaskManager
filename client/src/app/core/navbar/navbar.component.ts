import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    })
  }

  logout(){
    this.currentUser = null;
    this.authenticationService.logout();
  }

}
