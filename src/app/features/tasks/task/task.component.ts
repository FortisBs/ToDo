import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask, TaskFormData } from "../../../shared/models/task.model";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: ITask;
  @Output() deletedTaskId = new EventEmitter<string>();
  @Output() updatedTask = new EventEmitter<ITask>();

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
    if (this.task.id) {
      this.tasksService.deleteTask(this.task.id).subscribe(() => {
        this.deletedTaskId.emit(this.task.id);
      });
    }
  }

  onSaveChanges(data: TaskFormData) {
    const newTaskData: ITask = { ...this.task, name: data.name, complexity: data.complexity };
    this.tasksService.updateTask(newTaskData).subscribe({
      next: () => this.updatedTask.emit(newTaskData)
    });
  }

}
