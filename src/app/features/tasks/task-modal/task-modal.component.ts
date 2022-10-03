import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask, Task, TaskFormData, TaskStatus } from "../../../shared/models/task.model";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  @Input('item') taskToBeEdited!: ITask;
  @Input() taskStatus!: TaskStatus;
  @Input() editMode = false;
  @Output() modalClosed = new EventEmitter<boolean>();

  constructor(private tasksService: TasksService) {}

  closeModal() {
    this.editMode = false;
    this.modalClosed.emit(false);
  }

  addTask(formData: TaskFormData) {
    const task: ITask = new Task(
      formData.name.trim(),
      formData.complexity,
      this.taskStatus,
      this.tasksService.activeBoard.id!,
      new Date().toString()
    );
    this.tasksService.createTask(task);
    this.closeModal();
  }

  saveChanges(formData: TaskFormData) {
    const newTaskData: ITask = {
      ...this.taskToBeEdited,
      name: formData.name,
      complexity: formData.complexity
    };
    this.tasksService.updateTask(newTaskData);
    this.closeModal();
  }
}
