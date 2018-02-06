import {User} from "./user";
import {Category} from "./category";

export class Task {

  taskId: number;
  //categoryId: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: Category;
  user: User;

}
