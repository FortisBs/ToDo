import { Component, Input, OnInit } from '@angular/core';
import { ITask, TaskStatus } from "../../../shared/models/task.model";
import { ManageService } from "../../manage/manage.service";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() taskStatus!: TaskStatus;
  @Input() filteredTasks!: ITask[];

  isModalOpened = false;
  taskListColor!: string;

  constructor(private manageService: ManageService) {}

  ngOnInit(): void {
    this.taskListColor = this.manageService.getTaskListColor();
  }

  openModal() {
    this.isModalOpened = true;
  }
}
