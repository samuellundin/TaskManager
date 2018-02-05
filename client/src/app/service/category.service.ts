import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CATEGORY} from "./api.urls";
import 'rxjs/add/operator/map';
import {Category} from "../model/category";

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(CATEGORY.baseUrl);
  }

  registerCategory(category: Category) {
    return this.http.post(CATEGORY.baseUrl, category);
  }

  deleteCategory(categoryId: number) {
    console.log("delete catId " + categoryId + " in ts categoryservice");
    return this.http.delete(CATEGORY.baseUrl + "/delete/" + categoryId);
  }

}
