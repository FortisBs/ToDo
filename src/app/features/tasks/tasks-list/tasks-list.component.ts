import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ITask, TaskStatus } from "../../../shared/models/task.model";
import { TasksService } from "../tasks.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {
  @Input() taskStatus!: TaskStatus;
  @Input() filteredTasks!: ITask[];

  subscription!: Subscription;
  isModalOpened = false;
  draggingTask!: ITask | null;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.subscription = this.tasksService.droppableItem.subscribe({
      next: (task) => this.draggingTask = task
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openModal() {
    this.isModalOpened = true;
  }

  replaceTask(event: DragEvent) {
    event.preventDefault();
    if (this.taskStatus === 'Archived' || !this.draggingTask) return;

    if (this.draggingTask.status !== this.taskStatus) {
      this.tasksService.moveTaskToAnotherStatus(this.draggingTask, this.taskStatus);
    }
  }

  allowDrop(event: DragEvent) {
    if (this.taskStatus === 'Archived') return;
    event.preventDefault();
  }
}
