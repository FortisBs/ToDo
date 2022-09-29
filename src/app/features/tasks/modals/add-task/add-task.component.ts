import { Component, EventEmitter, Output } from '@angular/core';

export type TaskFormData = { name: string, storyPoints: number };

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  @Output() modalClosed = new EventEmitter<boolean>();
  @Output() newTaskData = new EventEmitter<TaskFormData>();

  closeModal() {
    this.modalClosed.emit(false);
  }

  onSubmit(formData: TaskFormData) {
    this.newTaskData.emit(formData);
    this.closeModal();
  }
}
