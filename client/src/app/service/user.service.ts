import {Injectable} from "@angular/core";
import {USER} from "./api.urls";
import "rxjs/add/operator/map";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(USER.baseUrl);
  }

  getByUsername(username: string) {
    return this.http.get(USER.baseUrl + '/' + username + '/');
  }
  getUser(){
    return this.http.get(USER.baseUrl);
  }

  updateUser(user: User) {
    return this.http.put(USER.baseUrl + '/update', user);
  }

}
