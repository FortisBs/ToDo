import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ITask, TaskStatus, taskStatuses } from "../../shared/models/task.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksGroupedByStatus$ = new Subject<Map<TaskStatus, ITask[]>>();
  groupedTasks = new Map<TaskStatus, ITask[]>();
  openedTaskComments = new Subject<ITask>();
  droppableItem = new Subject<ITask | null>();

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

  initTasks(id: string) {
    this.http
      .get(`https://todo-565c1-default-rtdb.firebaseio.com/tasks.json?orderBy="boardId"&equalTo="${id}"`)
      .subscribe((response) => {
        const data: ITask[] = (response) ? Object.values(response) as ITask[] : [];

        taskStatuses.forEach((status) => {
          const tasksByStatus = data.filter((task) => {
            return task.status === status;
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
        const tasks = this.groupedTasks.get(taskToBeDeleted.status) || [];
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
        const tasks = this.groupedTasks.get(updatedTask.status) || [];
        const index = tasks.findIndex((task) => task.id === updatedTask.id);
        tasks[index] = updatedTask;

        this.groupedTasks.set(updatedTask.status, tasks.slice());
        this.tasksGroupedByStatus$.next(this.groupedTasks);
      });
  }

  moveTaskToAnotherStatus(movedTask: ITask, newStatus: TaskStatus) {
    const taskWithNewStatus: ITask = { ...movedTask, status: newStatus };
    this.http
      .patch(`https://todo-565c1-default-rtdb.firebaseio.com/tasks/${movedTask.id}.json`, taskWithNewStatus)
      .subscribe(() => {
        const previousGroup = this.groupedTasks.get(movedTask.status) || [];
        const nextGroup = this.groupedTasks.get(newStatus) || [];
        const index = previousGroup.findIndex((task) => task.id === movedTask.id);

        previousGroup.splice(index, 1);
        nextGroup.unshift(taskWithNewStatus);

        this.groupedTasks.set(newStatus, nextGroup.slice());
        this.tasksGroupedByStatus$.next(this.groupedTasks);
      });
  }
}
