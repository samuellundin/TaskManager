import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TASK} from "./api.urls";
import 'rxjs/add/operator/map';
import {Task} from "../model/task";

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get(TASK.baseUrl);
  }

  registerTask(task: Task) {
    return this.http.post(TASK.baseUrl, task);
  }

}
