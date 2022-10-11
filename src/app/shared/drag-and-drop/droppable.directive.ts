import { Directive, HostListener } from '@angular/core';
import { DragAndDropService } from "./drag-and-drop.service";

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  constructor(private dragAndDropService: DragAndDropService) { }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent): void {
    this.dragAndDropService.onDragStart(event);
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent): void {
    this.dragAndDropService.onDragMove(event);
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent): void {
    this.dragAndDropService.onDragEnd(event);
  }
}
