import { Component, OnInit } from '@angular/core';
import { TasksService } from "./tasks.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  boardName!: string;
  taskColumnsByStatus = ['To do', 'In Progress', 'Done'];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.boardName = this.tasksService.activeBoard.name;
  }

}
