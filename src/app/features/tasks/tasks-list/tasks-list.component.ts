import { Component, Input } from '@angular/core';
import { ITask, TaskStatus } from "../../../shared/models/task.model";
import { TasksService } from "../tasks.service";
import { DragAndDropService } from "../../../shared/drag-and-drop/drag-and-drop.service";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {
  @Input() taskStatus!: TaskStatus;
  @Input() filteredTasks!: ITask[];

  isModalOpened = false;

  constructor(
    private tasksService: TasksService,
    private dragAndDropService: DragAndDropService
  ) {}

  openModal() {
    this.isModalOpened = true;
  }

  selectTask(task: ITask) {
    this.dragAndDropService.droppableItem = task;
  }

  replaceTask() {
    if (this.dragAndDropService.droppableItem.status === this.taskStatus) {
      return;
    }
    this.tasksService.moveTaskToAnotherStatus(this.dragAndDropService.droppableItem, this.taskStatus);
  }
}
