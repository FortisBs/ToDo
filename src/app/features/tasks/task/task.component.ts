import { Component, Input } from '@angular/core';
import { ITask } from "../../../shared/models/task.model";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: ITask;

  optionsOpened = false;
  editOpened = false;

  constructor(private tasksService: TasksService) {}

  toggleOptions(event: MouseEvent) {
    event.stopPropagation();
    this.optionsOpened = !this.optionsOpened;
  }

  openEdit(event: MouseEvent) {
    event.stopPropagation();
    this.editOpened = true;
    this.optionsOpened = false;
  }

  delete(event: MouseEvent) {
    event.stopPropagation();
    this.tasksService.deleteTask(this.task);
  }

  moveToArchive(event: MouseEvent) {
    event.stopPropagation();
    this.tasksService.moveTaskToAnotherStatus(this.task, 'Archived');
  }

  openComments() {
    this.tasksService.openedTaskComments.next(this.task);
  }

  selectTask() {
    this.tasksService.droppableItem.next(this.task);
  }

}
