import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}
