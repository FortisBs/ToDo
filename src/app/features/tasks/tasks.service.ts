import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IBoard } from "../../shared/models/board.model";
import { ITask } from "../../shared/models/task.model";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  activeBoard!: IBoard;
  searchValue = '';

  constructor(private http: HttpClient) {}

  createTask(task: ITask) {
    return this.http
      .post<{name: string}>('https://todo-565c1-default-rtdb.firebaseio.com/tasks.json', task)
      .pipe(map((generatedId) => {
          task.id = generatedId.name;
          this.addId(task);
          return task;
        }));
  }

  private addId(task: ITask) {
    this.http
      .patch(`https://todo-565c1-default-rtdb.firebaseio.com/tasks/${task.id}.json`, task)
      .subscribe();
  }

  getTasks() {
    return this.http
      .get('https://todo-565c1-default-rtdb.firebaseio.com/tasks.json')
      .pipe(map((data) => (data) ? Object.values(data) as ITask[] : []));
  }
}
