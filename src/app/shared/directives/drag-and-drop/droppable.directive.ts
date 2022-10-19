import { Directive, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from "../../../features/tasks/tasks.service";
import { ITask, TaskStatus } from "../../models/task.model";
import { Subscription } from "rxjs";

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective implements OnInit, OnDestroy {
  subscription!: Subscription;
  draggingTask!: ITask | null;

  @Input() taskStatus!: TaskStatus;

  @HostBinding('class.dropzone')
  isDroppable = this.taskStatus !== 'Archived' && this.draggingTask;

  @HostListener('dragover', ['$event']) allowDrop(event: DragEvent) {
    if (this.taskStatus === 'Archived') return;
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) replaceTask(event: DragEvent) {
    event.preventDefault();
    if (this.taskStatus === 'Archived' || !this.draggingTask) return;

    if (this.draggingTask.status !== this.taskStatus) {
      this.tasksService.moveTaskToAnotherStatus(this.draggingTask, this.taskStatus);
    }
  }

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.subscription = this.tasksService.droppableItem.subscribe({
      next: (task) => this.draggingTask = task
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
