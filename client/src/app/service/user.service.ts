import {Injectable} from "@angular/core";
import {USER} from "./api.urls";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  getAllUsers() {
    return this.http.get(USER.baseUrl).map((response: Response) => response.json());
  }
}
