import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Task} from "../model/task";
import {TASK} from "./api.urls";

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get(TASK.baseUrl);
  }

  registerTask(task: Task) {
    return this.http.post(TASK.baseUrl, task);
  }

  /*getTaskByCategoryId(categoryId: number) {
    return this.http.get(TASK.baseUrl +'/'+ categoryId)
  }*/

  getAllTasksByUserId(userId: number) {
    return this.http.get(TASK.baseUrl + '/user/' + userId);
  }

  deleteTask(taskId: number) {
    return this.http.delete(TASK.baseUrl + '/' + taskId);
  }

  updateTask(task: Task) {
    console.log(task);
    return this.http.put(TASK.baseUrl, task);
  }
}
