import { Directive, HostListener, Input } from '@angular/core';
import { TasksService } from "../../../features/tasks/tasks.service";
import { ITask } from "../../models/task.model";

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @Input() draggableItem!: ITask;

  constructor(private tasksService: TasksService) {}

  @HostListener('dragstart') onDragStart() {
    this.tasksService.droppableItem.next(this.draggableItem);
  }

  @HostListener('dragend') onDragEnd() {
    this.tasksService.droppableItem.next(null);
  }
}
