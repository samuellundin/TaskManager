import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CATEGORY} from "./api.urls";
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(CATEGORY.baseUrl);
  }

}
