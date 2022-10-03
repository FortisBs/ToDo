import { Component, Input } from '@angular/core';
import { ITask, TaskStatus } from "../../../shared/models/task.model";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {
  @Input() taskStatus!: TaskStatus;
  @Input() filteredTasks!: ITask[];
  isModalOpened = false;

  openModal() {
    this.isModalOpened = true;
  }
}
