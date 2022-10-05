import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IBoard } from "../../shared/models/board.model";
import { ITask, TaskStatus, taskStatuses } from "../../shared/models/task.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  activeBoard!: IBoard;
  tasksGroupedByStatus$ = new Subject<Map<TaskStatus, ITask[]>>();
  groupedTasks = new Map<TaskStatus, ITask[]>();

  constructor(private http: HttpClient) {}

  createTask(task: ITask) {
    this.http
      .post<{name: string}>('https://todo-565c1-default-rtdb.firebaseio.com/tasks.json', task)
      .subscribe((generatedId) => {
        task.id = generatedId.name;
        const tasks = this.groupedTasks.get(task.status) || [];
        tasks.push(task);
        this.groupedTasks.set(task.status, tasks.slice());
        this.tasksGroupedByStatus$.next(this.groupedTasks);
        this.addId(task);
      });
  }

  private addId(task: ITask) {
    this.http
      .patch(`https://todo-565c1-default-rtdb.firebaseio.com/tasks/${task.id}.json`, task)
      .subscribe();
  }

  initTasks() {
    this.http
      .get('https://todo-565c1-default-rtdb.firebaseio.com/tasks.json')
      .subscribe((response) => {
        const data: ITask[] = (response) ? Object.values(response) as ITask[] : [];

        taskStatuses.forEach((status) => {
          const tasksByStatus = data.filter((task) => {
            return task.boardId === this.activeBoard.id && task.status === status;
          });
          this.groupedTasks.set(status, tasksByStatus);
        });

        this.tasksGroupedByStatus$.next(this.groupedTasks);
      });
  }

  deleteTask(taskToBeDeleted: ITask) {
    this.http
      .delete(`https://todo-565c1-default-rtdb.firebaseio.com/tasks/${taskToBeDeleted.id}.json`)
      .subscribe(() => {
        const tasks = this.groupedTasks.get(taskToBeDeleted.status);
        if (!tasks) return;
        const index = tasks.findIndex((task) => task.id === taskToBeDeleted.id);
        tasks.splice(index, 1);
        this.groupedTasks.set(taskToBeDeleted.status, tasks.slice());
        this.tasksGroupedByStatus$.next(this.groupedTasks);
      });
  }

  updateTask(updatedTask: ITask) {
    this.http
      .patch(`https://todo-565c1-default-rtdb.firebaseio.com/tasks/${updatedTask.id}.json`, updatedTask)
      .subscribe(() => {
        const tasks = this.groupedTasks.get(updatedTask.status);
        if (!tasks) return;
        const index = tasks.findIndex((task) => task.id === updatedTask.id);
        tasks[index] = updatedTask;
        this.groupedTasks.set(updatedTask.status, tasks.slice());
        this.tasksGroupedByStatus$.next(this.groupedTasks);
      });
  }
}
