import { Component, OnInit } from '@angular/core';
import { TasksService } from "./tasks.service";
import { ITask, TaskStatus } from "../../shared/models/task.model";
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  boardName!: string;
  taskStatuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
  tasksGroupedByStatus$!: Observable<ITask[][]>;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.boardName = this.tasksService.activeBoard.name;

    this.tasksGroupedByStatus$ = this.tasksService.getTasks().pipe(
      map((data) => this.filterReceivedData(data))
    );
  }

  private filterReceivedData(data: ITask[]) {
    return this.taskStatuses.map((status) => {
      return data.filter((task) => {
        return task.boardId === this.tasksService.activeBoard.id && task.status === status;
      });
    });
  }

}
