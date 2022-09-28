import { Component, OnInit } from '@angular/core';
import { TasksService } from "./tasks.service";
import { ITask, TaskStatus } from "../../shared/models/task.model";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  boardName!: string;
  taskColumnsByStatus: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
  allTasks!: ITask[];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.boardName = this.tasksService.activeBoard.name;

    this.tasksService.getTasks().subscribe({
      next: (data) => this.allTasks = data
    });
  }

  filterTasksByStatus(status: TaskStatus) {
    return this.allTasks.filter((task) => task.status === status);
  }

}
