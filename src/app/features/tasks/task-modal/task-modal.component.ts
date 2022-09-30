import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask, TaskFormData } from "../../../shared/models/task.model";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  @Input('item') task!: ITask;
  @Input() editMode = false;
  @Output() modalClosed = new EventEmitter<boolean>();
  @Output() taskData = new EventEmitter<TaskFormData>();

  closeModal() {
    this.editMode = false;
    this.modalClosed.emit(false);
  }

  onSubmit(formData: TaskFormData) {
    this.taskData.emit(formData);
    this.closeModal();
  }

}
